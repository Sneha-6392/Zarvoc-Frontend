import styles from '../Styles/Team.module.css'

const teamMembers = [
  { name: "John Doe", role: "CEO & Founder" },
  { name: "Jane Smith", role: "Marketing Head" },
  { name: "Mike Johnson", role: "Product Manager" },
  { name: "Emily Davis", role: "Customer Support" },
  { name: "Chris Lee", role: "Logistics Coordinator" }
]

const Team = () => {
  return (
    <section className={styles.teamSection}>
      <div className={styles.sectionTitle}>
        <h2>Meet Our Team</h2>
      </div>
      <div className={styles.teamGrid}>
        {teamMembers.map((member, index) => (
          <div key={index} className={`${styles.teamCard} animated`} style={{ animationDelay: `${index * 0.1}s` }}>
            <img src="https://via.placeholder.com/150" alt={member.name} className={styles.teamImg} />
            <h3>{member.name}</h3>
            <p>{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Team