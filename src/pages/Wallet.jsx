import React from 'react'
import "./Wallet.css"

import WalletHistory from './WalletHistory'

const Wallet = () => {
  return (
    <div className='main'>
        <div className="leftside">
          <div className="profile-name">
            <div className="profile-img">
              <img className='image' src="https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg" alt="" />
            </div>
            <div className="name">
              <h3>Profile Name</h3>
           
              <h4>Id Number</h4>
            </div>
          </div>
          <div className="available-balance">
            <h4>Available Balance</h4>
            <p>$ 9148.23</p>
          </div>
          <div className="send-receive">
            <div className="money">
            <img width="24" height="24" src="https://img.icons8.com/ios-glyphs/30/228BE6/sent.png" alt="sent"/>
              <h4>Send</h4>
              <p>$ 654.42</p>
              <button>Buy</button>
            </div>
            <div className="money">
            <img width="24" height="24" src="https://img.icons8.com/external-xnimrodx-lineal-xnimrodx/64/228BE6/external-receive-passive-income-xnimrodx-lineal-xnimrodx.png" alt="external-receive-passive-income-xnimrodx-lineal-xnimrodx"/>
              <h4>Receive</h4>
              <p>$ 654.42</p>
              <button>Receive</button>
            </div>
            <div className="money">
            <img width="24" height="24" src="https://img.icons8.com/ios/50/228BE6/money-bag-euro.png" alt="money-bag-euro"/>
              <h4>Add Money</h4>
              <p>$ 654.42</p>
              <button>Withdraw</button>
            </div>
          </div>
        </div>
        <div className="rightside">
          <h3 className='text-center'>Transaction History</h3>
          <WalletHistory /></div>
    </div>
  )
}

export default Wallet
