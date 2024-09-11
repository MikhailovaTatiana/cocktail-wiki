import { MouseEventHandler, ReactElement } from 'react';
import '../styles/Button.css';


interface IButtonprops {
  label: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type: 'button' | 'submit' | 'reset';
}

export function Button(props: IButtonprops): ReactElement {
  return (
    <button className="button" onClick={props.onClick} type={props.type}>
      {props.label}
    </button>
  );
}
