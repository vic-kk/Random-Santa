import { PropsWithChildren } from 'react';
import { Address } from './../../data';
import './Recipient.css'

type targetData = Address | undefined;

interface RecipientProps {
  target: targetData;
};

const TEXTS = {
  err: 'Упс, не нашел твой ID. Обратись к админу',
  title: 'Адреса и пожелания получателя твоего подарка:',
};

const Recipient = ({ target, children }: PropsWithChildren<RecipientProps>) => {
  if (!target) return (
    <h2>{TEXTS.err}</h2>
  )

  return (
    <div className='recipient'>
      <h2>{TEXTS.title}</h2>
      {children}
    </div>
  )
}

export default Recipient;