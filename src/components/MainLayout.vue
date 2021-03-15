<template>
  <MainHeader />
  <main>
    <slot></slot>
  </main>
  <MainFooter />
</template>

<script>
import MainHeader from './MainHeader';
import MainFooter from './MainFooter';
export default {
  name: 'MainLayout',
  components: {
    MainHeader,
    MainFooter,
  },
};
</script>
