// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = "0xdceea07389a497b2267d10c29968f4551c6509be" //process.env.CONTRACT_ADDRESS
// interact.js
const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")
// console.log(JSON.stringify(contract.abi))
// interact.js
const URL = process.env.API_URL
// Provider
const alchemyProvider = new ethers.providers.JsonRpcProvider(
    // (network = "sepolia"),
    // API_KEY
    URL
  )
  
  // Signer
  const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)
  
  // Contract
  const helloWorldContract = new ethers.Contract(
    CONTRACT_ADDRESS,
    contract.abi,
    signer
  )
  async function main() {
    const message = await helloWorldContract.message()
    console.log("The message is: " + message)
  
    console.log("Updating the message...")
    const tx = await helloWorldContract.update("This is the new message.")
    await tx.wait()
    const newMessage = await helloWorldContract.message()
    console.log("The new message is: " + newMessage)
  }
  main()
