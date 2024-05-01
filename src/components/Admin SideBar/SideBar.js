import React from 'react'
import "./SideBar.css"
import { SideBarData } from './SideBarData'

function SideBar() {
  return (
    <div className='SideBar'>
      <h3 style={{color: 'white', marginBlock: '30px'}}>Admin Dashboard</h3>
        <ul className='SideBarList'>
            {SideBarData.map((val,key)=>{
                return(
                    <li key={key} className="row" id={window.location.pathname==val.link ? "active" :""}onClick={()=> {
                        window.location.pathname = val.link;
                    }}
                    >
                      {" "}
                      <div id="icon">{val.icon}</div>
                      <div id="title">{val.title}</div>
                    </li>
                )
            })}
        </ul>
    </div>
  )
}

export default SideBar