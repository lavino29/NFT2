import React from 'react'
import { Market } from '../../config/contract'
import { useEffect, useState } from 'react'
import market from '../../abis/market.json'
import axios from 'axios'
import {contractProvider} from '../../helpers/contractProvider'
import { ethers } from 'ethers'

export const Marketplace = () => {
  const [nfts, setNfts] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  useEffect(() => {
    loadNFTs()
  }, [])

   const loadNFTs = async () => {
     try {
      const marketplaceContract = await contractProvider(Market,market)
      //console.log(marketplaceContract)
      const data = await marketplaceContract.fetchMarketItems()
      //console.log(data.toString().split(','))
      const items = await Promise.all(data.map(async i => {
        const tokenURI = await marketplaceContract.tokenURI(i.tokenId)
        
        const meta = await axios.get(tokenURI)
        
        //let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
        let item = {
          tokenId: i.tokenId.toNumber(),
          image: meta.data.image,
          tokenURI,
          name: meta.data.name,
          description: meta.data.description,
          price: i.price
        }
        
        return item
      }))
        setNfts(items)
        setLoadingState('loaded') 
     } catch (error) {
       console.log(error)
     }
 
  
  }
    
     
    
  
  const buyNFT = async (nft) => {
    console.log('nft:', nft)
    try {
      const marketplaceContract = await contractProvider(Market,market)
      //console.log(marketplaceContract)
      const data = await marketplaceContract.createMarketSale(nft.tokenId)
      const response = await data.wait()
      console.log(response)
    } catch (error) {
      
    }
  }
  
  return (
    <>
        {(loadingState === 'loaded' && !nfts.length) && (<h1 className="py-10 px-20 text-3xl">No NFTs owned</h1>) }
         
          <div className="container">
            <div className="">
              <div className="d-flex justify-content-center mb-4">

       
                {
                nfts.map((nft, i) => (

                  <div key={nft.tokenId} className="card">
                      <img
                        src={nft.image}
                        className="card-img-top"
                        alt="Peaks Against the Starry Sky"
                      />
                      <div className="card-body">
                        <h5 className="card-title">{nft.name}</h5>
                        <p className="card-text">
                          {nft.description}
                        </p>
                        <p>{ethers.utils.formatEther ( nft.price.toString() ) }</p>
                        <button onClick={ ()=> buyNFT(nft)} className="btn btn-primary d-block mt-1">COMPRAR</button>
                        
                      </div>
                  </div>
                ))
                }
                  </div>
                </div>
              </div>
            
    </>
  )
}