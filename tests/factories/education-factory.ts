// Education factory for creating test education data
import { faker } from '@faker-js/faker';
import { BaseFactory, FakeData } from './base-factory';

export interface TestEducation {
  id: string;
  profileId: string;
  degree: string;
  institution: string;
  location?: string;
  startDate: string;
  endDate?: string;
  grade?: string;
  description?: string;
  isCurrent: boolean;
}

export class EducationFactory extends BaseFactory<TestEducation> {
  protected defaultAttributes(): Partial<TestEducation> {
    const isCurrent = faker.datatype.boolean({ probability: 0.2 });
    const startYear = faker.number.int({ min: 2000, max: 2020 });
    const endYear = isCurrent ? null : startYear + faker.number.int({ min: 2, max: 6 });
    
    return {
      id: faker.string.uuid(),
      profileId: faker.string.uuid(),
      degree: faker.helpers.arrayElement([
        'Bachelor of Science in Computer Science',
        'Bachelor of Engineering in Software Engineering',
        'Master of Science in Computer Science',
        'Master of Business Administration',
        'Bachelor of Technology in Information Technology',
        'Master of Engineering in Software Systems',
        'Bachelor of Science in Information Systems',
        'PhD in Computer Science'
      ]),
      institution: faker.helpers.arrayElement([
        'Stanford University',
        'Massachusetts Institute of Technology',
        'University of California, Berkeley',
        'Carnegie Mellon University',
        'Harvard University',
        'University of Washington',
        'Georgia Institute of Technology',
        'University of Illinois at Urbana-Champaign',
        'University of Texas at Austin',
        'Indian Institute of Technology',
        'National Institute of Technology',
        'University of Oxford',
        'University of Cambridge',
        'Imperial College London'
      ]),
      location: FakeData.location(),
      startDate: `${startYear}-09-01`,
      endDate: endYear ? `${endYear}-06-01` : undefined,
      grade: FakeData.grade(),
      description: faker.helpers.maybe(() => 
        faker.lorem.paragraph({ min: 1, max: 2 }), { probability: 0.6 }
      ),
      isCurrent
    };
  }
  
  protected getTraitAttributes(trait: string): Partial<TestEducation> {
    switch (trait) {
      case 'bachelors_cs':
        return {
          degree: 'Bachelor of Science in Computer Science',
          startDate: '2018-09-01',
          endDate: '2022-06-01',
          isCurrent: false,
          grade: faker.helpers.arrayElement(['3.8/4.0', 'A', 'First Class']),
          description: 'Focused on algorithms, data structures, software engineering, and computer systems.'
        };
        
      case 'masters_cs':
        return {
          degree: 'Master of Science in Computer Science',
          startDate: '2022-09-01',
          endDate: '2024-06-01',
          isCurrent: false,
          grade: faker.helpers.arrayElement(['3.9/4.0', 'A+', 'Distinction']),
          description: 'Specialized in machine learning, distributed systems, and software architecture.'
        };
        
      case 'phd_current':
        return {
          degree: 'PhD in Computer Science',
          startDate: '2023-09-01',
          endDate: undefined,
          isCurrent: true,
          grade: undefined,
          description: 'Research focus on artificial intelligence and natural language processing.'
        };
        
      case 'bootcamp':
        return {
          degree: 'Full Stack Web Development Certificate',
          institution: faker.helpers.arrayElement([
            'Lambda School', 'General Assembly', 'Flatiron School',
            'App Academy', 'Hack Reactor', 'The Odin Project'
          ]),
          startDate: '2023-01-01',
          endDate: '2023-06-01',
          isCurrent: false,
          grade: undefined,
          description: 'Intensive program covering JavaScript, React, Node.js, and database technologies.'
        };
        
      case 'incomplete':
        return {
          degree: 'Bachelor of Science in Computer Engineering',
          startDate: '2020-09-01',
          endDate: undefined,
          isCurrent: false,
          grade: undefined,
          description: 'Left to pursue career opportunities in software development.'
        };
        
      case 'international':
        return {
          institution: faker.helpers.arrayElement([
            'University of Toronto', 'University of Melbourne',
            'Technical University of Munich', 'ETH Zurich',
            'University of Tokyo', 'National University of Singapore'
          ]),
          location: faker.helpers.arrayElement([
            JSON.stringify({ city: 'Toronto', country: 'Canada' }),
            JSON.stringify({ city: 'Melbourne', country: 'Australia' }),
            JSON.stringify({ city: 'Munich', country: 'Germany' }),
            JSON.stringify({ city: 'Zurich', country: 'Switzerland' }),
            JSON.stringify({ city: 'Tokyo', country: 'Japan' }),
            JSON.stringify({ city: 'Singapore', country: 'Singapore' })
          ])
        };
        
      case 'prestigious':
        return {
          institution: faker.helpers.arrayElement([
            'Stanford University', 'Massachusetts Institute of Technology',
            'Harvard University', 'Carnegie Mellon University'
          ]),
          grade: faker.helpers.arrayElement(['3.9/4.0', '4.0/4.0', 'A+', 'Summa Cum Laude']),
          description: 'Graduated with highest honors. Active in research and student organizations.'
        };
        
      default:
        return {};
    }
  }
}

// Export singleton instance
export const educationFactory = new EducationFactory();