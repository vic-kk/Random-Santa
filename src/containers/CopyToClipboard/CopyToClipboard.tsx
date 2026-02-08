import { PropsWithChildren } from 'react';
import { copyToClipboard } from '../../utils';
import './CopyToClipboard.css'

interface CopyToClipboardProps {
  title?: string;
  successMessage?: string;
  value: string;
};

const CopyToClipboard = ({ title = 'Нажми, чтобы скопировать', successMessage, value, children }: PropsWithChildren<CopyToClipboardProps>) => {
  const copyСonfig = {
    successMessage: successMessage,
  }

  const clickHandler = () => copyToClipboard(value.toString(), copyСonfig)

  return (
    <div
      className='clickable'
      onClick={() => clickHandler()}
      title={title}
    >
      📑 {children}
    </div>
  )
}

export default CopyToClipboard;