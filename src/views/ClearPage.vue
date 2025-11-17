<template>
  <div class="d-flex fill-height justify-center align-center flex-column">
    <v-progress-circular indeterminate color="indigo"></v-progress-circular>
  </div>
</template>

<script>
export default {
  name: "ClearPage",
  mounted() {
    setTimeout(async () => {
      if ('serviceWorker' in navigator) {
        try {
          const registrations = await navigator.serviceWorker.getRegistrations();
          for (let registration of registrations) {
            await registration.unregister();
          }
        } catch (error) {
          console.error('Error unregistering Service Workers:', error);
        }
      }

      if ('caches' in window) {
        try {
          const cacheNames = await caches.keys();
          await Promise.all(
            cacheNames.map(cacheName => caches.delete(cacheName))
          );
        } catch (error) {
          console.error('Error clearing caches:', error);
        }
      }

      const link = document.createElement('a');
      link.href = "/";
      link.target = '_self';
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
    }, 500)
  }
};
</script>

<style scoped></style>
