import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons/faPencilAlt';
// import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import styles from './Convert.module.css';

export default function Convert() {
	return (
		<div className={styles.convertButton}>
			<FontAwesomeIcon icon={faPencilAlt} size='lg' color='#F9C80E' />
			{/* <FontAwesomeIcon icon={faCheck} size='lg' color='#B5FFE1' /> */}
		</div>
	);
}
