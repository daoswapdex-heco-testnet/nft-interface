import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

export default () => {

  return (
    <DefaultFooter
      copyright={`2021 Daoswap`}
      links={[
        {
          key: 'Daoswap Offical WebSite',
          title: 'Daoswap Offical WebSite',
          href: 'https://www.daoswap.cc',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/daoswapdex',
          blankTarget: true,
        },
        {
          key: 'Daoswap Docs',
          title: 'Daoswap Docs',
          href: 'https://docs.daoswap.cc',
          blankTarget: true,
        },
      ]}
    />
  );
};
