<template>
    <div>
      <h2>{{ isEdit ? 'Edit' : 'Add' }} Contact</h2>
  
      <form @submit.prevent="handleSubmit">
        <div>
          <label for="firstName">First Name:</label>
          <input type="text" v-model="contact.firstName" required />
        </div>
        <div>
          <label for="lastName">Last Name:</label>
          <input type="text" v-model="contact.lastName" required />
        </div>
        <div>
          <label for="email">Email:</label>
          <input type="email" v-model="contact.email" required />
        </div>
        <div>
          <label for="phone">Phone:</label>
          <input type="text" v-model="contact.phone" />
        </div>
        <button type="submit">{{ isEdit ? 'Update' : 'Add' }} Contact</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  
  const route = useRoute()
  const router = useRouter()
  
  
  const isEdit = route.params.id !== undefined
  
  
  const contact = ref({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  })
  
  
  onMounted(() => {
    if (isEdit) {
      const contactId = route.params.id
      const contacts = JSON.parse(localStorage.getItem('contacts')) || []
      const foundContact = contacts.find(c => c.id === contactId)
      if (foundContact) {
        contact.value = { ...foundContact }
      }
    }
  })
  
  
  const handleSubmit = () => {
    const contacts = JSON.parse(localStorage.getItem('contacts')) || []
    
    if (isEdit) {
      
      const updatedContacts = contacts.map(c =>
        c.id === contact.value.id ? { ...contact.value } : c
      )
      localStorage.setItem('contacts', JSON.stringify(updatedContacts))
    } else {
     
      const newContact = { ...contact.value, id: Date.now().toString() }
      contacts.push(newContact)
      localStorage.setItem('contacts', JSON.stringify(contacts))
    }
  
    
    router.push('/')
  }
  </script>
  