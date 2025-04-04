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
          href: 'https://blog.csdn.net/peng_YuJun',
          blankTarget: true,
        },
        {
          key: 'gitee',
          title: 'My Gitee',
          href: 'https://gitee.com/yuJunOk',
          blankTarget: true,
        },
        {
          key: 'github',
          title: 'My GitHub',
          href: 'https://github.com/yuJunOk',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
