import { PropsWithChildren } from 'react';
import { copyToClipboard } from '../../utils';
import './CopyToClipboard.css'

interface CopyToClipboardProps {
  title?: string;
  successMessage?: string;
  value: string;
  showEmoji?: boolean;
};

const CopyToClipboard = ({ title = 'Нажми, чтобы скопировать', successMessage, value, showEmoji, children }: PropsWithChildren<CopyToClipboardProps>) => {
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
      {showEmoji && <span>📑 </span>}
      {children}
    </div>
  )
}

export default CopyToClipboard;