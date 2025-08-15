// Experience factory for creating test experience data
import { faker } from '@faker-js/faker';
import { BaseFactory, FakeData } from './base-factory';

export interface TestExperience {
  id: string;
  profileId: string;
  jobRoleId?: string;
  companyId: string;
  location?: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  rolesAndResponsibilities?: string;
}

export class ExperienceFactory extends BaseFactory<TestExperience> {
  protected defaultAttributes(): Partial<TestExperience> {
    const isCurrent = faker.datatype.boolean({ probability: 0.3 });
    const startYear = faker.number.int({ min: 2018, max: 2023 });
    const startMonth = faker.number.int({ min: 1, max: 12 });
    const endYear = isCurrent ? null : startYear + faker.number.int({ min: 1, max: 5 });
    const endMonth = endYear ? faker.number.int({ min: 1, max: 12 }) : null;
    
    return {
      id: faker.string.uuid(),
      profileId: faker.string.uuid(),
      jobRoleId: faker.helpers.arrayElement([
        'software-engineer', 'senior-software-engineer', 'frontend-developer',
        'backend-developer', 'fullstack-developer', 'tech-lead',
        'engineering-manager', 'devops-engineer', 'data-scientist'
      ]),
      companyId: faker.string.uuid(),
      location: FakeData.location(),
      startDate: `${startYear}-${startMonth.toString().padStart(2, '0')}-01`,
      endDate: endYear && endMonth ? `${endYear}-${endMonth.toString().padStart(2, '0')}-01` : undefined,
      isCurrent,
      rolesAndResponsibilities: this.generateResponsibilities()
    };
  }
  
  private generateResponsibilities(): string {
    const responsibilities = faker.helpers.arrayElements([
      'Developed and maintained web applications using modern JavaScript frameworks',
      'Collaborated with cross-functional teams to deliver high-quality software solutions',
      'Implemented RESTful APIs and microservices architecture',
      'Optimized application performance and reduced load times by 40%',
      'Mentored junior developers and conducted code reviews',
      'Led technical discussions and architectural decision-making',
      'Implemented automated testing and CI/CD pipelines',
      'Worked closely with product managers and designers to define requirements',
      'Troubleshot and resolved production issues in 24/7 environment',
      'Contributed to open-source projects and technical documentation',
      'Participated in agile development processes and sprint planning',
      'Designed and implemented database schemas and data models',
      'Integrated third-party APIs and services',
      'Conducted performance monitoring and system optimization',
      'Implemented security best practices and compliance requirements'
    ], { min: 3, max: 6 });
    
    return responsibilities.map((resp, index) => `• ${resp}`).join('\n');
  }
  
  protected getTraitAttributes(trait: string): Partial<TestExperience> {
    switch (trait) {
      case 'current_job':
        return {
          isCurrent: true,
          endDate: undefined,
          startDate: faker.date.past({ years: 2 }).toISOString().split('T')[0],
          rolesAndResponsibilities: [
            '• Leading development of new product features using React and Node.js',
            '• Managing a team of 4 junior developers',
            '• Architecting scalable microservices infrastructure',
            '• Collaborating with stakeholders on technical roadmap planning'
          ].join('\n')
        };
        
      case 'previous_job':
        return {
          isCurrent: false,
          startDate: '2020-01-01',
          endDate: '2023-06-01',
          rolesAndResponsibilities: [
            '• Developed full-stack applications using MERN stack',
            '• Implemented automated testing reducing bugs by 60%',
            '• Collaborated with design team on user experience improvements',
            '• Participated in agile development and code reviews'
          ].join('\n')
        };
        
      case 'internship':
        return {
          jobRoleId: 'software-engineering-intern',
          isCurrent: false,
          startDate: '2022-06-01',
          endDate: '2022-08-01',
          rolesAndResponsibilities: [
            '• Contributed to frontend development using React and TypeScript',
            '• Worked on bug fixes and feature enhancements',
            '• Learned industry best practices and development workflows',
            '• Collaborated with senior engineers on code reviews'
          ].join('\n')
        };
        
      case 'senior_role':
        return {
          jobRoleId: faker.helpers.arrayElement([
            'senior-software-engineer', 'tech-lead', 'engineering-manager'
          ]),
          startDate: '2019-01-01',
          endDate: faker.datatype.boolean() ? '2023-12-01' : undefined,
          isCurrent: faker.datatype.boolean(),
          rolesAndResponsibilities: [
            '• Led architecture decisions for high-traffic applications',
            '• Mentored team of 6 engineers and conducted technical interviews',
            '• Implemented performance optimizations improving response times by 50%',
            '• Drove adoption of best practices and code quality standards',
            '• Collaborated with executive team on technical strategy'
          ].join('\n')
        };
        
      case 'startup_experience':
        return {
          jobRoleId: 'fullstack-developer',
          startDate: '2021-03-01',
          endDate: '2023-09-01',
          isCurrent: false,
          rolesAndResponsibilities: [
            '• Built MVP from ground up using modern web technologies',
            '• Wore multiple hats: frontend, backend, DevOps, and database design',
            '• Rapidly prototyped features based on user feedback',
            '• Implemented analytics and monitoring for product insights',
            '• Worked directly with founders on product strategy'
          ].join('\n')
        };
        
      case 'big_tech':
        return {
          jobRoleId: 'software-engineer',
          startDate: '2020-07-01',
          endDate: '2024-01-01',
          isCurrent: false,
          rolesAndResponsibilities: [
            '• Developed large-scale distributed systems serving millions of users',
            '• Implemented machine learning algorithms for recommendation systems',
            '• Collaborated with teams across multiple time zones',
            '• Contributed to open-source projects and internal tooling',
            '• Participated in on-call rotations and incident response'
          ].join('\n')
        };
        
      case 'remote_work':
        return {
          location: JSON.stringify({
            city: 'Remote',
            state: null,
            country: 'Global',
            remote: true
          }),
          rolesAndResponsibilities: [
            '• Developed software solutions in fully remote, distributed team',
            '• Utilized async communication and collaboration tools effectively',
            '• Maintained high productivity while working across time zones',
            '• Participated in virtual team building and knowledge sharing',
            '• Delivered projects on time with minimal in-person supervision'
          ].join('\n')
        };
        
      case 'short_stint':
        return {
          startDate: '2023-01-01',
          endDate: '2023-04-01',
          isCurrent: false,
          rolesAndResponsibilities: [
            '• Contributed to immediate project needs during transition period',
            '• Quickly adapted to existing codebase and team processes',
            '• Delivered key features under tight deadlines'
          ].join('\n')
        };
        
      default:
        return {};
    }
  }
}

// Export singleton instance
export const experienceFactory = new ExperienceFactory();