import React from 'react'
import { useEffect, useState } from 'react'
import market from '../../abis/market.json'
import axios from 'axios'
import { Market } from '../../config/contract'
import {contractProvider} from '../../helpers/contractProvider'

export const MisNFT = () => {
  const [nfts, setNfts] = useState([])
  const [price, setPrice ] = useState('')
  const [loadingState, setLoadingState] = useState('not-loaded')
  useEffect(() => {
    loadNFTs()
  }, [])

   const loadNFTs = async () => {
   const marketplaceContract = await contractProvider(Market,market)
   console.log(marketplaceContract)
   const data = await marketplaceContract.allMyNFT()
   console.log(data.toString().split(','))
   const items = await Promise.all(data.map(async i => {
     console.log(i)
     const tokenURI = await marketplaceContract.tokenURI(i.toNumber() )
     
     const meta = await axios.get(tokenURI)
     console.log()
     
     let item = {
       tokenId: i.toNumber() ,
       image: meta.data.image,
       tokenURI,
       name: meta.data.name,
       description: meta.data.description

     }
     return item
   }))
   setNfts(items)
   setLoadingState('loaded') 
  }
    
 
    
  
  const  listNFT = async (nft) => {
    try {
      if(price !== ""){
        
       // const pricer = ethers.utils.parseUnits(price.toString(), 'ether')
        const marketplaceContract = await contractProvider(Market,market)
        const response = await marketplaceContract.createMarketItem( nft.tokenId, price)
       
        console.log(response)
      }
     
  
    } catch (error) {
      console.log(error)
    }
  
   

  }
  const handlePrecio = (e) =>{
    if( e.target.value > 0){
      //let price = ethers.utils.formatUnits(e.target.value.toString(), 'ether')
      console.log()
      setPrice(e.target.value )
    }

    

  }

  return (
    <>
        {(loadingState === 'loaded' && !nfts.length) && (<h1 className="py-10 px-20 text-3xl">No NFTs owned</h1>) }
         
          <div className="container">
            <div className="">
              <div className="d-flex justify-content-center mb-4">

       
                {
                nfts.map((nft) => (

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
                        <div className="card-body precio">
                        <input type="number" className='"form-control' placeholder='Precio' onChange={handlePrecio} />
                        <button onClick={ ()=> listNFT(nft)} className="btn btn-primary d-block mt-1">vender</button>
                        </div>
                        
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