<template>
    <div>
      <h2>All Contacts</h2>
      <div class="filter-inputs">
  <input v-model="filterFirst" placeholder="Filter by first name" />
  <input v-model="filterLast" placeholder="Filter by last name" />
</div>


  
      <ul class="contact-list">
  <li v-for="contact in filteredContacts" :key="contact.id">
    <router-link :to="`/view/${contact.id}`">
      {{ contact.lastName }}, {{ contact.firstName }}
    </router-link>
  </li>
</ul>

    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  
  const contacts = ref([])  
  const filterFirst = ref('')  
  const filterLast = ref('')   
  
  
  onMounted(() => {
    const saved = localStorage.getItem('contacts')
    contacts.value = saved ? JSON.parse(saved) : []
  })
  
  
  const sortedContacts = computed(() => {
    return [...contacts.value].sort((a, b) => a.lastName.localeCompare(b.lastName))
  })
  
  
  const filteredContacts = computed(() => {
    return sortedContacts.value.filter(c => {
      const first = c.firstName.toLowerCase()
      const last = c.lastName.toLowerCase()
      return first.includes(filterFirst.value.toLowerCase()) &&
             last.includes(filterLast.value.toLowerCase())
    })
  })
  </script>
  