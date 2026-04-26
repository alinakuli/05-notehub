import css from './SearchBox.module.css';

export default function SearchBox({ onChange }: { onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) { 
    return (
        <input
  className={css.input}
  type="text"
  placeholder="Search notes"
  onChange={onChange}
 />
    )
}