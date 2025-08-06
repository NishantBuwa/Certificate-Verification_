const axios = require('axios');
const crypto = require('crypto')

async function storeCertHashOnBlockchain(certificateHash) {
  try {
    const response = await axios.post(
      'https://api.tatum.io/v3/record',
      {
        data: certificateHash, // ✅ store the cert hash
        chain: 'MATIC',   // ✅ use a testnet chain
        fromPrivateKey: process.env.REACT_APP_PRIVATE_KEY,
        from: process.env.REACT_APP_TO_ADDRESS,
        to: process.env.REACT_APP_TO_ADDRESS,
      },
      {
        headers: {
          'x-api-key': process.env.REACT_APP_TATUM_API_KEY,
          'Content-Type': 'application/json',
          'accept': 'application/json'
        }
      }
    );

    // console.log('✅ Successfully stored on blockchain:', response.data);
    return response.data;
  } catch (error) {
    // console.error('❌ Error storing on blockchain:', error?.response?.data || error.message);
    throw error;
  }
}

const calcHash = (studentName, course, issueDate) => {
  const dataToHash = `${studentName}-${course}-${issueDate}`;
  const certHash = crypto.createHash("sha256").update(dataToHash).digest("hex");
  return certHash;
}

module.exports = { storeCertHashOnBlockchain, calcHash };