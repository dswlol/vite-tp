<template>
	<router-view v-slot="{ Component }">
		<transition name="fade" mode="out-in">
			<KeepAlive>
				<component :is="Component" />
			</KeepAlive>
		</transition>
	</router-view>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
