import { Routes, Route } from 'react-router-dom';
import React from 'react';
import { Navbar } from '../components/ui/Navbar';
import { MisNFT } from '../components/misNFT/MisNFT';
import { CrearNFT } from '../components/crearNft/CrearNFT';
import { Marketplace } from '../components/markeplace/Marketplace';


export const DashboardRoutes = () => {
    return (
        <>
            <Navbar />

            <div className="container">
                <Routes>
                    <Route path="add" element={<CrearNFT />} />
                    <Route path="nft" element={<MisNFT />} />
                    <Route path="market" element={<Marketplace />} />     
                    <Route path="/" element={< CrearNFT/>} />

                </Routes>
            </div>
        </>
    )
}