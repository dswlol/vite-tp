<template>
	<div>
			<div class="b-1 bg-cyan-400" @click="jumpPage">xxxx{{ textRef }}dd {{ t('home') }}d</div>
			<button
				class="inline-block cursor-pointer rounded from-pink-500 via-red-500 to-yellow-500 bg-gradient-to-r px-8 py-2 text-sm font-medium text-white transition !border-0 !outline-none"
				hover="scale-110 shadow-xl"
				@click="counter.inc()"
			>
				{{ counter.count }}
			</button>

			<PageWrap />
			<div @click="getName">
				sswwww == = {{ getName('123') }}
			</div>
	</div>
</template>
<script lang="ts" setup>
defineOptions({
	name: 'Home',
});
import {getName} from '~/utils/index'
const router = useRouter();

const jumpPage = () => {
	router.push('/about')
}
// import { ref } from 'vue';
const textRef = ref('skss');
const { t } = useI18n();
const counter = createCounter();
</script>

<style></style>
<route> { meta: { layout: 'admin' } } </route>
