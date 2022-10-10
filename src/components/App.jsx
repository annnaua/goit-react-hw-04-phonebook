import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import { Section } from './Section/Section';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  // componentDidMount
  useEffect(() => {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    parsedContacts ? setContacts(parsedContacts) : setContacts([]);
  }, []);

  // componentDidUpdate
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleSubmit = ({ name, number }, { resetForm }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    addContact(contact);

    resetForm();
  };

  const addContact = newContact => {
    contacts.find(
      ({ name }) => name.toLowerCase() === newContact.name.toLowerCase()
    )
      ? alert(`${newContact.name} is already in contacts`)
      : setContacts(contacts => [newContact, ...contacts]);
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(({ id }) => id !== contactId)
    );
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const filteredContacts = () => {
    const filtered = filter.toLowerCase();
    return contacts.filter(({ name }) => name.toLowerCase().includes(filtered));
  };

  return (
    <div>
      <Section title={'Phonebook'}>
        <ContactForm onAddContact={handleSubmit} />
      </Section>

      <Section title={'Contacts'}>
        <Filter value={filter} onFilterContacts={changeFilter} />

        <ContactList
          contacts={filteredContacts()}
          onDeleteContact={deleteContact}
        />
      </Section>
    </div>
  );
};
