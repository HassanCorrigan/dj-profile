<template>
  <MainHeader />
  <MainContent />
  <MainFooter />
</template>

<script>
import MainHeader from './components/MainHeader';
import MainContent from './components/MainContent';
import MainFooter from './components/MainFooter';

export default {
  name: 'App',
  components: {
    MainHeader,
    MainContent,
    MainFooter,
  },
};
</script>

<style></style>
