import classNames from 'classnames/bind';
import styles from './SignupLayout.module.scss';

const cx = classNames.bind(styles);

function SignupLayout({ children }) {
    return <div className={cx('content')}>{children}</div>;
}

export default SignupLayout;
