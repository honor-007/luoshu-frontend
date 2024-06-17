import Guide from '@/components/Guide';
import {trim} from '@/utils/format';
import {PageContainer} from '@ant-design/pro-components';
import {useModel} from '@umijs/max';
import styles from './index.less';
import {DEFAULT_NAME} from "@/constants";
import {Access} from "@@/exports";
import {Button} from "antd";

const HomePage: React.FC = () => {
    const {name} = useModel('global');
    return (
        <div className={styles.container}>
            {/*<Guide name={trim(name)}/>*/}
            <div>{`欢迎使用${DEFAULT_NAME}`}</div>
            <div className={`${styles.container} ${styles.aa}`}>{`欢迎使用${DEFAULT_NAME}`}</div>
            <div className={styles.containerbb}>{`欢迎使用${DEFAULT_NAME}`}</div>
            <div className = {styles.cc}>{`欢迎使用${DEFAULT_NAME}`}</div>
            <div className={styles.dd}>{`欢迎使用${DEFAULT_NAME}`}</div>
            <Access accessible={true}>
                <Button>只有 Admin 可以看到这个按钮</Button>
            </Access>
        </div>
    );
};

export default HomePage;
