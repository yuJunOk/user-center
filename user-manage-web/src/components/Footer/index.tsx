import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  const defaultMessage = "pengYuJun自定义网站";
  const currenYear = new Date().getFullYear();
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currenYear} ${defaultMessage}`}
      links={[
        {
          key: 'blog',
          title: 'My Blog',
          href: 'https://pro.ant.design',
          blankTarget: true,
        },
        {
          key: 'gitee',
          title: 'My Gitee',
          href: 'https://ant.design',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <><GithubOutlined /> My GitHub</>,
          href: 'https://github.com/ant-design/ant-design-pro',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
