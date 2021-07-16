import { message } from 'antd';
import React, { useState } from 'react';
import ProForm from '@ant-design/pro-form';
import { Link, history, SelectLang, useModel } from 'umi';
import Footer from '@/components/Footer';
import { initConnect } from '@/utils/web3';

import styles from './index.less';

/** 此方法会跳转到 redirect 参数所在的位置 */
const goto = () => {
  if (!history) return;
  setTimeout(() => {
    const { query } = history.location;
    const { redirect } = query as { redirect: string };
    history.push(redirect || '/');
  }, 10);
};

const Login: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);
  const { initialState, setInitialState } = useModel('@@initialState');

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      // 连接钱包
      const connect = await initConnect();
      if (connect) {
        setInitialState({
          ...initialState,
          ...connect,
        });
        goto();
      }
      return;
    } catch (error) {
      console.info(error);
      message.error('失败，请重试！');
    }
    setSubmitting(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.lang} data-lang>
        {SelectLang && <SelectLang />}
      </div>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <Link to="/">
              <img alt="logo" className={styles.logo} src="/logo.svg" />
              <span className={styles.title}>NFT Interface</span>
            </Link>
          </div>
          <div className={styles.desc}></div>
        </div>

        <div className={styles.main}>
          <ProForm
            submitter={{
              searchConfig: {
                submitText: 'Connect Wallet',
              },
              render: (_, dom) => dom.pop(),
              submitButtonProps: {
                loading: submitting,
                size: 'large',
                style: {
                  width: '100%',
                },
              },
            }}
            onFinish={async () => {
              handleSubmit();
            }}
          ></ProForm>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
