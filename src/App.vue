<template>
  <div id="app">
    <div class="container">
      <place-input />

      <schedule
        v-if="showSchedule && !hasError"
        :items="formattedSchedules"
      />

      <p v-if="hasError" class="message message--error">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import PlaceInput from './components/PlaceInput.vue';
import Schedule from './components/Schedule.vue';

export default {
  name: 'app',
  components: {
    PlaceInput,
    Schedule,
  },
  computed: {
    ...mapGetters([
      'showSchedule',
      'formattedSchedules',
      'hasError',
      'errorMessage',
    ]),
  }
};
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Rubik&display=swap');
  
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  #app {
    font-family: 'Rubik', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    padding: 16px 0;
  }

  .container {
    margin-right: auto;
    margin-left: auto;
    max-width: 626px;
    padding-right: 8px;
    padding-left: 8px;
  }

  .message {
    background-color: #e4e4e4;
    border-radius: 8px;
    padding: 1em 2em;
    text-align: left;

    &--error {
      background-color: #c00;
      color: #fff;
    }
  }
</style>
