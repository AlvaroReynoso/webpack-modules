import '../css/components.css';

export const saludar=(nombre)=>{
const h1=document.createElement('h1');
h1.innerText=`Hola ${nombre}, que tal todo?`;
document.body.append(h1);
}
