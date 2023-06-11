import Legacy from '@vitejs/plugin-legacy'; // 传统浏览器提供支持

export default function () {
  const plugins = [
    Legacy({
      //传统浏览器提供支持
      targets: ['defaults', 'not IE 11']
    })
  ];

  return plugins;
}
