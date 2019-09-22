<template>
	<div>
		<span>
			{{ scheduleDayOfWeek }}
		</span>
		<span>
			{{ scheduleTime }}
		</span>
	</div>
</template>

<script>
export default {
	name: 'ScheduleCardRow',
	props: {
		day: {
			type: Object,
			required: true,
		}
	},
	data() {
		return {
			daysOfWeek: [
				'Пн',
				'Вт',
				'Ср',
				'Чт',
				'Пт',
				'Сб',
				'Вс',
			]
		};
	},
	computed: {
		scheduleDayOfWeek() {
			return this.daysOfWeek[this.day.dayOfWeek - 1];
		},
		scheduleTime() {
			if (this.day.startAt === '00:00' && this.day.endAt === '23:59') {
				return 'Круглосуточно';
			}

			return `${this.day.startAt} - ${this.day.endAt}`;
		}
	}
}
</script>

<style scoped lang="scss">

</style>
