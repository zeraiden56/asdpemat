import React from 'react';

const Servicos = () => {
    return (
        <div className="p-4">
            <h2 className="text-3xl font-bold mb-4">Serviços</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-700 h-48"></div>
                <div className="bg-gray-700 h-48"></div>
                <div className="bg-gray-700 h-48"></div>
            </div>
        </div>
    );
};

export default Servicos;