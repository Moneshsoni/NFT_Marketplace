import {ethers} from 'ethers'
import { useEffect,useState } from 'react'
import axios from 'axios'
import web3Modal from "web3modal"
import styles from '../styles/Home.module.css'
import {
  nftaddress, nftmarketaddress
} from '/home/monesh/Desktop/NFT_Marketplace/config.js'

import NFT from '/home/monesh/Desktop/NFT_Marketplace/nft-marketpace/artifacts/contracts/NFT.sol/NFT.json'
import NFTMarket from '/home/monesh/Desktop/NFT_Marketplace/nft-marketpace/artifacts/contracts/NFTMarket.sol/NFTMarket.json'
import background from "/home/monesh/Desktop/NFT_Marketplace/images/NFT-Marketplace.jpg";


export default function Home() {
  const [nfts,setNfts] = useState([])
  const [loadingState,setLoadingState] = useState('not-loaded')
  //set Loading state
  useEffect(()=>{
    loadNFTs()
  },[])
  async function loadNFTs(){
    const provider = new ethers.providers.JsonRpcProvider()
    const tokenContract = new ethers.Contract(nftaddress,NFT.abi,provider
      )
    const marketContract = new ethers.Contract(nftmarketaddress, NFTMarket.abi,provider)
    const data = await marketContract.fetchMarketItems()
    const items = await Promise.all(data.map(async i =>{
      const tokenUri = await tokenContract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenUri)//
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        price,  
        tokenId:i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
        name: meta.data.name,
        description: meta.data.description
      }
      return item
    }))

    //Set NFTS
    setNfts(items)
    setLoadingState('loaded')
  }

  async function buyNft(nft){
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(nftmarketaddress, NFTMarket.abi, signer)
    const price = ethers.utils.parseUnits()    
  }
  if (loadingState === 'loaded' && !nfts.length) return (<h1 className='px-20 py-10 text-3xl'>no items in marketpace</h1>)
  
  return (
    <div style={{ backgroundImage: `url(${background})` }} className={styles.container}>

    </div>
  )
}
