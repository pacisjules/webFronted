import React from 'react';
import Topbar from '../components/Topbar.js';

const Layout = ({ children }) => {
    return (
        
        <div> 
            <Topbar/>
            {children}
        </div>
    );
}

export default Layout;
