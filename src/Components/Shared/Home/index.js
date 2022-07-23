import styles from './home.module.css';
import React from 'react';
import Button from '../Button';
import Form from '../Form';
import Input from '../Input/InputText';
import Select from '../Input/InputSelect';

function Home() {
  const arrayToMapSelect = [
    { optionContent: 'Human Resources' },
    { optionContent: 'Systems' },
    { optionContent: 'Commercialization' }
  ];
  return (
    <section className={styles.container}>
      <section className={styles.home}>
        <h2>The future of Remote Work</h2>
        <div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consequat purus, nulla morbi
            bibendum in fringilla sed. Urna, elementum aliquam placerat platea aenean vestibulum
            varius. Magna elementum neque arcu, vulputate diam, tincidunt. Tempus facilisis feugiat
            habitant nulla elementum phasellus pulvinar leo sit.
          </p>
          <img
            src="https://raw.githubusercontent.com/FranGutierrez/BaSP-M2022-Etapa-1/main/Semana-07/img/home-draw.png"
            alt="Home Draw"
          />
        </div>
        <Button className="learn-more" label="LEARN MORE" />
      </section>
      <section className={styles.functions}>
        <h3>Functions</h3>
        <div className={styles.functionContainer}>
          <div className={styles.function}>
            <img
              src="https://raw.githubusercontent.com/FranGutierrez/BaSP-M2022-Etapa-1/main/Semana-07/img/clock.png"
              alt="Clock"
            />
            <div>
              <h4>Timekeeping</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Leo, venenatis volutpat
                fusce vitae, in suspendisse proin massa. Mattis nulla libero nibh eu nisl sed.
              </p>
            </div>
          </div>
          <div className={styles.function}>
            <img
              src="https://raw.githubusercontent.com/FranGutierrez/BaSP-M2022-Etapa-1/main/Semana-07/img/person.png"
              alt="Person"
            />
            <div>
              <h4>Resource management</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Leo, venenatis volutpat
                fusce vitae, in suspendisse proin massa. Mattis nulla libero nibh eu nisl sed.
              </p>
            </div>
          </div>
          <div className={styles.function}>
            <img
              src="https://raw.githubusercontent.com/FranGutierrez/BaSP-M2022-Etapa-1/main/Semana-07/img/file.png"
              alt="File"
            />
            <div>
              <h4>Reports</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Leo, venenatis volutpat
                fusce vitae, in suspendisse proin massa. Mattis nulla libero nibh eu nisl sed.
              </p>
            </div>
          </div>
          <div className={styles.function}>
            <img
              src="https://raw.githubusercontent.com/FranGutierrez/BaSP-M2022-Etapa-1/main/Semana-07/img/tuerca.png"
              alt="Tuerca"
            />
            <div>
              <h4>Multiple roles</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Leo, venenatis volutpat
                fusce vitae, in suspendisse proin massa. Mattis nulla libero nibh eu nisl sed.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.assets}>
        <h3>Assets</h3>
        <div className={styles.assetsContainer}>
          <div className={styles.asset}>
            <img
              src="https://raw.githubusercontent.com/FranGutierrez/BaSP-M2022-Etapa-1/main/Semana-07/img/trackeability.png"
              alt="Trackeability"
            />
            <h4>Trackeability</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Leo, venenatis volutpat fusce
              vitae, in suspendisse proin massa. Mattis nulla libero nibh eu nisl sed.
            </p>
            <Button className="more" label="MORE" />
          </div>
          <div className={styles.asset}>
            <img
              src="https://raw.githubusercontent.com/FranGutierrez/BaSP-M2022-Etapa-1/main/Semana-07/img/equipment-manager.png"
              alt="EqManagement"
            />
            <h4>Equipment management</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Leo, venenatis volutpat fusce
              vitae, in suspendisse proin massa. Mattis nulla libero nibh eu nisl sed.
            </p>
            <Button className="more" label="MORE" />
          </div>
          <div className={styles.asset}>
            <img
              src="https://raw.githubusercontent.com/FranGutierrez/BaSP-M2022-Etapa-1/main/Semana-07/img/decision-making.png"
              alt="DecisionMaking"
            />
            <h4>Decision making</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Leo, venenatis volutpat fusce
              vitae, in suspendisse proin massa. Mattis nulla libero nibh eu nisl sed.
            </p>
            <Button className="more" label="MORE" />
          </div>
          <div className={styles.asset}>
            <img
              src="https://raw.githubusercontent.com/FranGutierrez/BaSP-M2022-Etapa-1/main/Semana-07/img/efficiency.png"
              alt="Efficiency"
            />
            <h4>Efficiency</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Leo, venenatis volutpat fusce
              vitae, in suspendisse proin massa. Mattis nulla libero nibh eu nisl sed.
            </p>
            <Button className="more" label="MORE" />
          </div>
        </div>
      </section>
      <Form goBack={false} header="Contact us">
        <Input
          label="Full name"
          type="text"
          id="fullName"
          name="fullName"
          placeholder="Enter your full name"
        />
        <Input label="Email" type="email" id="email" name="email" placeholder="Enter your email" />
        <Select
          label="Category"
          id="category"
          name="category"
          placeholder="Select a category"
          arrayToMap={arrayToMapSelect}
        />
        <Input type="text" id="message" name="message" placeholder="Enter your message" />
      </Form>
      <section className={styles.aboutUs}>
        <h3>About us</h3>
        <div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis mauris, sit placerat
            nullam amet, et sit. Porta vivamus diam vivamus non. Gravida semper nulla eu urna cras
            elit. Mattis suspendisse consequat tempor condimentum commodo malesuada etiam venenatis.
            Volutpat augue quam commodo nascetur in dolor at egestas sollicitudin. Nulla non auctor
            tempus pellentesque. Scelerisque metus tristique auctor scelerisque. Enim at est id orci
            at malesuada sed morbi. Quis orci, pretium amet nibh.
          </p>
          <img
            src="https://raw.githubusercontent.com/FranGutierrez/BaSP-M2022-Etapa-1/main/Semana-07/img/about-us.png"
            alt="AboutUs"
          />
        </div>
      </section>
      <section className={styles.listsContainer}>
        <div className={styles.lists}>
          <h5>Products</h5>
          <ol>
            <li>Functions</li>
            <li>Downloads</li>
            <li>Integrations</li>
            <li>Extras</li>
          </ol>
        </div>
        <div className={styles.lists}>
          <h5>Company</h5>
          <ol>
            <li>About us</li>
            <li>Customers</li>
            <li>Resources</li>
            <li>Blog</li>
          </ol>
        </div>
        <div className={styles.lists}>
          <h5>Support</h5>
          <ol>
            <li>Help</li>
            <li>Tutorial</li>
            <li>API</li>
            <li>Contact</li>
          </ol>
        </div>
      </section>
    </section>
  );
}

export default Home;
