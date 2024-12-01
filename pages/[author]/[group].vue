<template>
  <div>
    <pre>Group: {{ Group }}</pre>
    <pre>Author: {{ Author }}</pre>
  </div>
</template>

<script setup lang="ts">
const Group = useRouteParams('group', '', { transform: String })
const Author = useRouteParams('author', '', { transform: String })
</script>
