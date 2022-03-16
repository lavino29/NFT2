import React, { useState } from 'react'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import market from '../../abis/market.json'
import TokenMain from '../../abis/TokenMain.json'
import {contractProvider} from '../../helpers/contractProvider'
import { Market, Token as token,  Main } from '../../config/contract'
import Token  from '../../abis/Token.json'
import { ethers } from 'ethers'
const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')



export const CrearNFT = () => {
    const [fileUrl, setFileUrl] = useState(null)
    const [formInput, updateFormInput] = useState({ name: '', description: '' })

//------------- ----------- IPFS TOKEN URI -------------------------------------

   const onChange= async (e) => {
        const file = e.target.files[0]
        
        try {
        

            const added = await client.add(file)
            
            const url = `https://ipfs.infura.io/ipfs/${added.path}`
           
            setFileUrl(url)
          
          
          
        } catch (error) {
          console.log('Error uploading file: ', error)
        }  
      }
      const uploadToIPFS = async () => {
        const { name, description } = formInput
        if (!name || !description || !fileUrl) return
        /* first, upload to IPFS */
        const data = JSON.stringify({
          name, description, image: fileUrl
        })
        try {
          const added = await client.add(data)
          const url = `https://ipfs.infura.io/ipfs/${added.path}`
          
          /* after file is uploaded to IPFS, return the URL to use it in the transaction */
          return url
        } catch (error) {
          console.log('Error uploading file: ', error)
        }  
      }
      //------------- -----------CREAR UN NFT -------------------------------------
    const handleCreateNFT = async (e) =>{
        
        e.preventDefault()
        try {
          const url = await uploadToIPFS()
        /* next, create the item */
    
        const contract = await contractProvider(Market,market)
         await contract.createToken(url)
      
        } catch (error) {
            console.error(error)
        }

      
    }
    //------------- -----------DROP INICIAL  -------------------------------------
    const handleReward = async()=>{
        try {
          
        const contract = await contractProvider(Main,TokenMain)
         //const price = ethers.utils.parseUnits("100000", 'ether')
         await contract.DropInicial() 
        } catch (error) {
            console.error(error)
        }
        

    }
    const allowwance = async() =>{
      const tokenContract = await contractProvider(token,Token)
      const aprobar = ethers.utils.parseUnits('1000000000', 'ether')
      await tokenContract.approve(Market, aprobar )
      //const response = await tokenContract.allowance("0xff40c0bf109Edddd3cbE9ffe8d825954e9cb8352", Market)
      const response = await tokenContract.balanceOf("0x9432Ee459C43d518CD35B3B8dBcE79485329CE1a")
      console.log(response.toString())
}

  return (
      <>
      <div className="container mb-4">
          <h3>Recive una recompensa del token para probarlo, hacer un NFT tiene un valor de 50000, el airdrop te dara 150000 token</h3>
          <span>todo estos token son ficticios a modo de prueba, solo se puedes hacer claim una vez ....</span>
          <button onClick={handleReward} type="submit" className="btn btn-primary">recibir</button>
          <button onClick={allowwance} type="submit" className="btn btn-primary ml-1">Aprobar contrato</button>
      </div>
        <form>
        <div className="form-group">
          <div className='h-25 w-25 '>
          {
        fileUrl && (
          <img className="mt-4 img-thumbnail rounded mx-auto d-block" width="250" height={250} src={fileUrl} />
        )
      }
          </div>
        
            <label htmlFor="exampleInputEmail1">Nombre para el NFT</label>
            <input onChange={e => updateFormInput({ ...formInput, name: e.target.value })}
             type="text" className="form-control"  aria-describedby="emailHelp" placeholder="Nombre..."/>
            
        </div>
        <div className="form-group">
            <label htmlFor="exampleInputPassword1">Descripcion</label>
            <input onChange={e => updateFormInput({ ...formInput, description: e.target.value })}
             type="text" className="form-control" id="exampleInputPassword1" placeholder="Descripcion.."/>
        </div>
  
        <div className="form-group">
            <label htmlFor="exampleFormControlFile1">Example file input</label>
            <input  onChange={onChange} name="Asset" type="file" className="form-control-file" id="exampleFormControlFile1"/>
        </div>
        <button onClick={handleCreateNFT} className="btn btn-primary">Crear NFT</button>
        </form>
    
  </>
  )
}
