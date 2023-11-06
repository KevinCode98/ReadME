
const obtenerCaracteresPorDispositivo = (altoDispositivo,anchoDispositivo,escalaDispositivo) => {
    
    const areaDispositivo = parseInt(anchoDispositivo * altoDispositivo);
    const modeloArea     = 320656;
    const escala         = 0.81;
    const caracteresArea = 125;

    const contante = (escalaDispositivo * modeloArea) / (escala * areaDispositivo);
    return parseInt(caracteresArea / contante);
}

module.exports = {
    obtenerCaracteresPorDispositivo
};