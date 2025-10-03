import InputComponent from '../input/InputComponent';
import CardComponent from '../Card/CardComponent';
import CheckBoxComponent from '../CheckBoxComponent/CheckBoxComponent';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import LinkComponent from '../LinkComponent/LinkComponent';

function CardLogin() {
  return (
    <CardComponent  width="400px" title={''} description={''} children={
      <div className='d-flex flex-column gap-4 p-3'>
        
        <InputComponent label='Usuario' type='string' placeholder='Ingresa tu usuario' />
        <InputComponent label='Contraseña' type='password' placeholder='Ingresa tu contraseña' />
        <CheckBoxComponent label='Recordar usuario' type='checkbox' id='recordar-usuario' />
        <ButtonComponent variant='primary' size='sm' content='Ingresar' className='btn-custom-primary w-100 py-3' />
        <LinkComponent variant='link' content='¿Olvidaste tu contraseña?' />
      </ div>
    }>
    </CardComponent>
  );
}
export default CardLogin;