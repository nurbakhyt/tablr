<template>
	<div class="card">
		<p
			v-if="item.isMain"
			class="card__title card__title--main"
		>
			<span>Часы работы</span>
			<span class="card__title--status">
				{{ status }}
			</span>
		</p>
		<p
			v-else
			class="card__title"
		>
			<span>{{ item.name }}</span>
			<span class="card__title--status">
				{{ status }}
			</span>
		</p>

		<schedule-card-row
			v-for="(day, i) in item.items"
			:key="i"
			:day="day"
			class="card__row"
		/>
	</div>
</template>

<script>
import ScheduleCardRow from './ScheduleCardRow';

export default {
	name: 'Card',
	components: {
		ScheduleCardRow,
	},
	props: {
		item: {
			type: Object,
			required: true,
		}
	},
	data() {
		return {
			today: new Date(),
			tablesheet: {

			},
		};
	},
	computed: {
		status() {
			if (this.currentTime.h >= this.scheduleTimeOfToday.startAt.h
				&& this.currentTime.h <= this.scheduleTimeOfToday.endAt.h
				&& this.currentTime.m >= this.scheduleTimeOfToday.startAt.m
				&& this.currentTime.m <= this.scheduleTimeOfToday.endAt.m
			) {
				return 'открыто';
			}

			return 'закрыто';
		},
		getNumberOfDay() {
			return this.today.getDay();
		},
		currentTime() {
			const h = this.today.getHours();
			const m = this.today.getMinutes();

			return {h, m};
		},
		scheduleOfToday() {
			return this.item.items[this.getNumberOfDay];
		},
		scheduleTimeOfToday() {
			if (!!this.scheduleOfToday) {
				const startAt = this.parseTime(this.scheduleOfToday.startAt);
				const endAt = this.parseTime(this.scheduleOfToday.endAt);

				return {
					startAt,
					endAt
				}
			}
		},
	},
	methods: {
		parseTime(str) {
			const arr = str.split(':');
			
			return {
				h: Number(arr[0]),
				m: Number(arr[1]),
			};
		},
	},
}
</script>

<style lang="scss" scoped>
	.card {
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		font-size: 14px;
		line-height: 17px;
		margin-bottom: 10px;
		padding-bottom: 5px;

		&:last-child {
			border-bottom: none;
			margin-bottom: 0;
			padding-bottom: 0;
		}

		&__title {
			display: flex;
			justify-content: space-between;
			color: rgba(0, 0, 0, 0.89);
			margin-bottom: 5px;
			text-align: left;

			&--main {
				justify-content: flex-start;
				font-size: 18px;
				line-height: 21px;
				margin-bottom: 14px;
				
				& > span:first-child {
					margin-right: 10px;
				}
			}

			&--status {
				color: rgba(0, 0, 0, 0.67);
			}
		}

		&__row {
			color: rgba(0, 0, 0, 0.67);
			display: flex;
			justify-content: space-between;
			margin-bottom: 5px;

			&:last-child {
				margin-bottom: 0;
			}
		}
	}
</style>
