import './GoogleForm.css'

interface GoogleFormProps {
  url: string;
};

const GoogleForm = ({ url }: GoogleFormProps) => {
  return (
    <iframe className='form' src={url}>Загрузка…</iframe>
  )
}

export default GoogleForm;