import { ethers } from 'ethers'
import Web3Modal from 'web3modal'

export const contractProvider =  async(address, {abi}) =>{
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    let contract = new ethers.Contract(address,abi , signer)
    return contract;
}