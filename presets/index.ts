import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url'
import { isPackageExists } from 'local-pkg'
import Legacy from '@vitejs/plugin-legacy'; // 传统浏览器提供支持
import Vue from '@vitejs/plugin-vue';
import EnvTypes from 'vite-plugin-env-types';
import Removelog from 'vite-plugin-removelog'
import Compression from 'vite-plugin-compression'
import Jsx from '@vitejs/plugin-vue-jsx'
import I18N from '@intlify/unplugin-vue-i18n/vite'
import UnoCSS from 'unocss/vite'
import VueDevTools from 'vite-plugin-vue-devtools'
import { warmup as Warmup } from 'vite-plugin-warmup'
import Modules from 'vite-plugin-use-modules'
import { AutoGenerateImports, vue3Presets } from 'vite-auto-import-resolvers'
// import { VueRouterAutoImports } from 'unplugin-vue-router';
import AutoImport from 'unplugin-auto-import/vite'
import {
	AntDesignVueResolver,
	ArcoResolver,
	DevUiResolver,
	ElementPlusResolver,
	HeadlessUiResolver,
	IduxResolver,
	InklineResolver,
	LayuiVueResolver,
	NaiveUiResolver,
	PrimeVueResolver,
	QuasarResolver,
	TDesignResolver,
	VantResolver,
	VarletUIResolver,
	ViewUiResolver,
	Vuetify3Resolver,
	VueUseComponentsResolver,
} from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { loadEnv } from 'vite'
import { argv } from 'process'

import type { Plugin } from 'vite'
import type { ComponentResolver } from 'unplugin-vue-components/types'

// 获取环境变量
function useEnv() {
	function detectMode() {
		const { NODE_ENV } = process.env
		const hasModeIndex = argv.findIndex((a) => a === '--mode' || a === '-m')
		if (hasModeIndex !== -1) {
			return argv[hasModeIndex + 1]
		}
		return NODE_ENV || 'development'
	}

	const stringToBoolean = (v: string) => {
		return Boolean(v === 'true' || false)
	}

	const {
		VITE_APP_TITLE,
		VITE_APP_DEV_TOOLS,
		VITE_APP_MARKDOWN,
		VITE_APP_API_AUTO_IMPORT,
		VITE_APP_MOCK_IN_PRODUCTION,
		VITE_APP_DIR_API_AUTO_IMPORT,
		VITE_APP_COMPRESSINON_ALGORITHM,
	} = loadEnv(detectMode(), '.')

	return {
		VITE_APP_TITLE,
		VITE_APP_COMPRESSINON_ALGORITHM,
		VITE_APP_DEV_TOOLS: stringToBoolean(VITE_APP_DEV_TOOLS),
		VITE_APP_MARKDOWN: stringToBoolean(VITE_APP_MARKDOWN),
		VITE_APP_API_AUTO_IMPORT: stringToBoolean(VITE_APP_API_AUTO_IMPORT),
		VITE_APP_MOCK_IN_PRODUCTION: stringToBoolean(VITE_APP_MOCK_IN_PRODUCTION),
		VITE_APP_DIR_API_AUTO_IMPORT: stringToBoolean(VITE_APP_DIR_API_AUTO_IMPORT),
	}
}

type Arrayable<T> = T | Array<T>
interface Options {
	onlyExist?: [Arrayable<ComponentResolver>, string][]
	include?: ComponentResolver[]
}

export const normalizeResolvers = (options: Options = {}) => {
	const { onlyExist = [], include = [] } = options

	const existedResolvers = []
	for (let i = 0; i < onlyExist.length; i++) {
		const [resolver, packageName] = onlyExist[i]
		if (isPackageExists(packageName)) {
			existedResolvers.push(resolver)
		}
	}

	existedResolvers.push(...include)

	return existedResolvers
}

export const _dirname =
	typeof __dirname !== 'undefined'
		? __dirname
		: dirname(fileURLToPath(import.meta.url))

// 别名插件
function Alias(): Plugin {
	const src = resolve(_dirname, '../src')
	return {
		name: 'vite-alias',
		enforce: 'pre',
		config(config) {
			config.resolve ??= {}
			config.resolve.alias = [
				{
					find: /^~/,
					replacement: src,
				},
			]
		},
	}
}

export default function () {
	const env = useEnv()
  const plugins = [
    Legacy({
      //传统浏览器提供支持
      targets: ['defaults', 'not IE 11']
		}),
		EnvTypes({
			dts: 'presets/types/env.d.ts',
		}),
		// https://github.com/bluwy/vite-plugin-warmup (依赖预热，加快渲染，未来可能会内置到 vite 中)
		// Warmup({
		// 	clientFiles: ['./src/**/*'],
		// }),
		// 模块自动加载
		Modules({
			auto: true,
			target: 'src/plugins',
		}),
    // vue 官方插件，用来解析 sfc
    Vue({
      include: [/\.vue$/, /\.md$/]
		}),
		// 调试工具
		env.VITE_APP_DEV_TOOLS && VueDevTools(),
		// 组件自动按需引入
		Components({
			directoryAsNamespace: true,
			include: [/\.vue$/, /\.vue\?vue/, /\.[tj]sx$/],
			extensions: ['vue', 'tsx', 'jsx'],
			dts: resolve(__dirname, './types/components.d.ts'),
			types: [
				{
					from: 'vue-router',
					names: ['RouterLink', 'RouterView'],
				},
			],
			resolvers: normalizeResolvers({
				onlyExist: [
					[VantResolver(), 'vant'],
					[QuasarResolver(), 'quasar'],
					[DevUiResolver(), 'vue-devui'],
					[NaiveUiResolver(), 'naive-ui'],
					[Vuetify3Resolver(), 'vuetify'],
					[PrimeVueResolver(), 'primevue'],
					[ViewUiResolver(), 'view-design'],
					[LayuiVueResolver(), 'layui-vue'],
					[VarletUIResolver(), '@varlet/ui'],
					[IduxResolver(), '@idux/components'],
					[InklineResolver(), '@inkline/inkline'],
					[ElementPlusResolver(), 'element-plus'],
					[HeadlessUiResolver(), '@headlessui/vue'],
					[ArcoResolver(), '@arco-design/web-vue'],
					[AntDesignVueResolver(), 'ant-design-vue'],
					[VueUseComponentsResolver(), '@vueuse/components'],
					[TDesignResolver({ library: 'vue-next' }), 'tdesign-vue-next'],
				],
			}),
		}),
		// i18n 国际化支持
		I18N({
			runtimeOnly: false,
			compositionOnly: true,
			include: ['locales/**'],
		}),
		// jsx 和 tsx 支持
		Jsx(),
		Compression({
			// @ts-ignore
			algorithm: env.VITE_APP_COMPRESSINON_ALGORITHM,
		}),
		// 生产环境下移除 console.log, console.warn, console.error
		process.env.NODE_ENV !== 'debug' && Removelog(),
		// 别名插件
		Alias(),
		UnoCSS()
	];

	if (env.VITE_APP_API_AUTO_IMPORT) {
		const dirs = env.VITE_APP_DIR_API_AUTO_IMPORT
			? ['src/stores/**', 'src/composables/**', 'src/api/**']
			: undefined
		// api 自动按需引入
		plugins.push(
			AutoImport({
				dirs,
				dts: './presets/types/auto-imports.d.ts',
				imports: [
					...AutoGenerateImports({
						include: [...vue3Presets],
						// exclude: ['vue-router'],
					}),
					// VueRouterAutoImports,
				],
				resolvers: normalizeResolvers({
					onlyExist: [
						[ElementPlusResolver(), 'element-plus'],
						[TDesignResolver({ library: 'vue-next' }), 'tdesign-vue-next'],
					],
				}),
				eslintrc: {
					enabled: true,
					globalsPropValue: true,
					filepath: 'presets/eslint/.eslintrc-auto-import.json',
				},
			})
		)
	}

  return plugins;
}
