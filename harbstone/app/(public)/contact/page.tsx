import ContactsBlock from "@/app/_components/sections/ContactsBlock/ContactsBlock";



export default function Contact() {
    return (
        <ContactsBlock
            title="Contacts"
            breadcrumbs={[
                {label: 'Main', href: '/'},
                {label: 'Contacts'}
            ]}
            numbers={[
                {number: '+371 22-400-200'},
                {number: '+371 22-400-300'},
            ]}
            email="hello@harbstone.digital"
            social={[
                {label: 'X (Twitter)', href: 'https://x.com'},
                {label: 'Instagram', href: 'https://www.instagram.com'},
                {label: 'Vimeo', href: 'https://vimeo.com'},
            ]}
            address="Liepājas iela 2 – 80, Rīga, LV-1002"
            cart="https://snazzymaps.com/embed/739735"
        />
    )
}
