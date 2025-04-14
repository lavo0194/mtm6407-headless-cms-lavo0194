<template>
    <div v-if="contact">
      <h2>Contact Details</h2>
  
      <p><strong>First Name:</strong> {{ contact.firstName }}</p>
      <p><strong>Last Name:</strong> {{ contact.lastName }}</p>
      <p><strong>Email:</strong> {{ contact.email }}</p>
      <p><strong>Phone:</strong> {{ contact.phone }}</p>
  
      <div class="button-group">
  <button @click="editContact">Edit</button>
  <button class="delete-button" @click="deleteContact">Delete</button>
</div>

<router-link to="/">Back to Contact List</router-link>

    </div>
    <div v-else>
      <p>Contact not found!</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  
  const route = useRoute()
  const router = useRouter()
  
  const contact = ref(null)
  
  
  onMounted(() => {
    const contacts = JSON.parse(localStorage.getItem('contacts')) || []
    const contactId = route.params.id
    contact.value = contacts.find(c => c.id === contactId)
  })
  
  
  const editContact = () => {
    if (contact.value) {
      router.push(`/edit/${contact.value.id}`)
    }
  }
  
  
  const deleteContact = () => {
    if (contact.value) {
      const contacts = JSON.parse(localStorage.getItem('contacts')) || []
      const updatedContacts = contacts.filter(c => c.id !== contact.value.id)
      localStorage.setItem('contacts', JSON.stringify(updatedContacts))
      router.push('/')  
    }
  }
  </script>
  