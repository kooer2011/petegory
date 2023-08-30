import * as React from 'react';

import NavbarHeader from '../components/Navbar';

import GroomingComponent from '../components/Grooming/GroomingComponent';

export default function Grooming() {
  return (
    <>
      <NavbarHeader />
      <section className="grooming__section">
        <GroomingComponent />
      </section>
    </>
  );
}
