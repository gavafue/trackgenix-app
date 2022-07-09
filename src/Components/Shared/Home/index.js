import styles from './home.module.css';
import React from 'react';

function Home() {
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
        <button className="learn-more">LEARN MORE</button>
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
            <button className="more">MORE</button>
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
            <button className="more">MORE</button>
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
            <button className="more">MORE</button>
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
            <button className="more">MORE</button>
          </div>
        </div>
      </section>
      <h3>Form</h3>
      <form>
        <div className="txtshorts">
          <div className="label-textbox">
            <input type="text" id="name" className="short-textbox" name="name" placeholder="Name" />
            <p className="label-error-none">Invalid value. Must have only letters.</p>
          </div>
          <div className="label-textbox">
            <input
              type="text"
              id="email"
              className="short-textbox"
              name="mail"
              placeholder="Mail"
            />
            <p className="label-error-none">Invalid e-mail</p>
          </div>
        </div>
        <select id="cat" name="category">
          <option value="Human Resources">Human Resources</option>
          <option value="Systems">Systems</option>
          <option value="Commercialization">Commercialization</option>
        </select>
        <div className="label-textbox">
          <input
            type="text"
            id="message"
            className="long-textbox"
            name="message"
            placeholder="Enter your message"
          />
          <p className="label-error-none">Invalid message</p>
        </div>
        <div className="buttons">
          <input type="submit" id="submit" value="SEND MESSAGE" />
          <input type="reset" value="RESET" />
        </div>
      </form>
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
    </section>
  );
}

export default Home;
