
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Profile
 * 
 */
export type Profile = $Result.DefaultSelection<Prisma.$ProfilePayload>
/**
 * Model RecruiterProfile
 * 
 */
export type RecruiterProfile = $Result.DefaultSelection<Prisma.$RecruiterProfilePayload>
/**
 * Model RecruiterVerificationMethods
 * 
 */
export type RecruiterVerificationMethods = $Result.DefaultSelection<Prisma.$RecruiterVerificationMethodsPayload>
/**
 * Model SavedJob
 * 
 */
export type SavedJob = $Result.DefaultSelection<Prisma.$SavedJobPayload>
/**
 * Model SkillUserMap
 * 
 */
export type SkillUserMap = $Result.DefaultSelection<Prisma.$SkillUserMapPayload>
/**
 * Model Education
 * 
 */
export type Education = $Result.DefaultSelection<Prisma.$EducationPayload>
/**
 * Model Experience
 * 
 */
export type Experience = $Result.DefaultSelection<Prisma.$ExperiencePayload>
/**
 * Model Resume
 * 
 */
export type Resume = $Result.DefaultSelection<Prisma.$ResumePayload>
/**
 * Model NotificationPreferences
 * 
 */
export type NotificationPreferences = $Result.DefaultSelection<Prisma.$NotificationPreferencesPayload>
/**
 * Model JobSearchPreferences
 * 
 */
export type JobSearchPreferences = $Result.DefaultSelection<Prisma.$JobSearchPreferencesPayload>
/**
 * Model FCMToken
 * 
 */
export type FCMToken = $Result.DefaultSelection<Prisma.$FCMTokenPayload>
/**
 * Model OTP
 * 
 */
export type OTP = $Result.DefaultSelection<Prisma.$OTPPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.profile`: Exposes CRUD operations for the **Profile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Profiles
    * const profiles = await prisma.profile.findMany()
    * ```
    */
  get profile(): Prisma.ProfileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.recruiterProfile`: Exposes CRUD operations for the **RecruiterProfile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RecruiterProfiles
    * const recruiterProfiles = await prisma.recruiterProfile.findMany()
    * ```
    */
  get recruiterProfile(): Prisma.RecruiterProfileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.recruiterVerificationMethods`: Exposes CRUD operations for the **RecruiterVerificationMethods** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RecruiterVerificationMethods
    * const recruiterVerificationMethods = await prisma.recruiterVerificationMethods.findMany()
    * ```
    */
  get recruiterVerificationMethods(): Prisma.RecruiterVerificationMethodsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.savedJob`: Exposes CRUD operations for the **SavedJob** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SavedJobs
    * const savedJobs = await prisma.savedJob.findMany()
    * ```
    */
  get savedJob(): Prisma.SavedJobDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.skillUserMap`: Exposes CRUD operations for the **SkillUserMap** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SkillUserMaps
    * const skillUserMaps = await prisma.skillUserMap.findMany()
    * ```
    */
  get skillUserMap(): Prisma.SkillUserMapDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.education`: Exposes CRUD operations for the **Education** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Educations
    * const educations = await prisma.education.findMany()
    * ```
    */
  get education(): Prisma.EducationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.experience`: Exposes CRUD operations for the **Experience** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Experiences
    * const experiences = await prisma.experience.findMany()
    * ```
    */
  get experience(): Prisma.ExperienceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.resume`: Exposes CRUD operations for the **Resume** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Resumes
    * const resumes = await prisma.resume.findMany()
    * ```
    */
  get resume(): Prisma.ResumeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.notificationPreferences`: Exposes CRUD operations for the **NotificationPreferences** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more NotificationPreferences
    * const notificationPreferences = await prisma.notificationPreferences.findMany()
    * ```
    */
  get notificationPreferences(): Prisma.NotificationPreferencesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.jobSearchPreferences`: Exposes CRUD operations for the **JobSearchPreferences** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more JobSearchPreferences
    * const jobSearchPreferences = await prisma.jobSearchPreferences.findMany()
    * ```
    */
  get jobSearchPreferences(): Prisma.JobSearchPreferencesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.fCMToken`: Exposes CRUD operations for the **FCMToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FCMTokens
    * const fCMTokens = await prisma.fCMToken.findMany()
    * ```
    */
  get fCMToken(): Prisma.FCMTokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.oTP`: Exposes CRUD operations for the **OTP** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OTPS
    * const oTPS = await prisma.oTP.findMany()
    * ```
    */
  get oTP(): Prisma.OTPDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.13.0
   * Query Engine version: 361e86d0ea4987e9f53a565309b3eed797a6bcbd
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Profile: 'Profile',
    RecruiterProfile: 'RecruiterProfile',
    RecruiterVerificationMethods: 'RecruiterVerificationMethods',
    SavedJob: 'SavedJob',
    SkillUserMap: 'SkillUserMap',
    Education: 'Education',
    Experience: 'Experience',
    Resume: 'Resume',
    NotificationPreferences: 'NotificationPreferences',
    JobSearchPreferences: 'JobSearchPreferences',
    FCMToken: 'FCMToken',
    OTP: 'OTP'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "profile" | "recruiterProfile" | "recruiterVerificationMethods" | "savedJob" | "skillUserMap" | "education" | "experience" | "resume" | "notificationPreferences" | "jobSearchPreferences" | "fCMToken" | "oTP"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Profile: {
        payload: Prisma.$ProfilePayload<ExtArgs>
        fields: Prisma.ProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          findFirst: {
            args: Prisma.ProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          findMany: {
            args: Prisma.ProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>[]
          }
          create: {
            args: Prisma.ProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          createMany: {
            args: Prisma.ProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>[]
          }
          delete: {
            args: Prisma.ProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          update: {
            args: Prisma.ProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          deleteMany: {
            args: Prisma.ProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProfileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>[]
          }
          upsert: {
            args: Prisma.ProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          aggregate: {
            args: Prisma.ProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProfile>
          }
          groupBy: {
            args: Prisma.ProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProfileCountArgs<ExtArgs>
            result: $Utils.Optional<ProfileCountAggregateOutputType> | number
          }
        }
      }
      RecruiterProfile: {
        payload: Prisma.$RecruiterProfilePayload<ExtArgs>
        fields: Prisma.RecruiterProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RecruiterProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecruiterProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RecruiterProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecruiterProfilePayload>
          }
          findFirst: {
            args: Prisma.RecruiterProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecruiterProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RecruiterProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecruiterProfilePayload>
          }
          findMany: {
            args: Prisma.RecruiterProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecruiterProfilePayload>[]
          }
          create: {
            args: Prisma.RecruiterProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecruiterProfilePayload>
          }
          createMany: {
            args: Prisma.RecruiterProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RecruiterProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecruiterProfilePayload>[]
          }
          delete: {
            args: Prisma.RecruiterProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecruiterProfilePayload>
          }
          update: {
            args: Prisma.RecruiterProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecruiterProfilePayload>
          }
          deleteMany: {
            args: Prisma.RecruiterProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RecruiterProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RecruiterProfileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecruiterProfilePayload>[]
          }
          upsert: {
            args: Prisma.RecruiterProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecruiterProfilePayload>
          }
          aggregate: {
            args: Prisma.RecruiterProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRecruiterProfile>
          }
          groupBy: {
            args: Prisma.RecruiterProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<RecruiterProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.RecruiterProfileCountArgs<ExtArgs>
            result: $Utils.Optional<RecruiterProfileCountAggregateOutputType> | number
          }
        }
      }
      RecruiterVerificationMethods: {
        payload: Prisma.$RecruiterVerificationMethodsPayload<ExtArgs>
        fields: Prisma.RecruiterVerificationMethodsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RecruiterVerificationMethodsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecruiterVerificationMethodsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RecruiterVerificationMethodsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecruiterVerificationMethodsPayload>
          }
          findFirst: {
            args: Prisma.RecruiterVerificationMethodsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecruiterVerificationMethodsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RecruiterVerificationMethodsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecruiterVerificationMethodsPayload>
          }
          findMany: {
            args: Prisma.RecruiterVerificationMethodsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecruiterVerificationMethodsPayload>[]
          }
          create: {
            args: Prisma.RecruiterVerificationMethodsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecruiterVerificationMethodsPayload>
          }
          createMany: {
            args: Prisma.RecruiterVerificationMethodsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RecruiterVerificationMethodsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecruiterVerificationMethodsPayload>[]
          }
          delete: {
            args: Prisma.RecruiterVerificationMethodsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecruiterVerificationMethodsPayload>
          }
          update: {
            args: Prisma.RecruiterVerificationMethodsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecruiterVerificationMethodsPayload>
          }
          deleteMany: {
            args: Prisma.RecruiterVerificationMethodsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RecruiterVerificationMethodsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RecruiterVerificationMethodsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecruiterVerificationMethodsPayload>[]
          }
          upsert: {
            args: Prisma.RecruiterVerificationMethodsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecruiterVerificationMethodsPayload>
          }
          aggregate: {
            args: Prisma.RecruiterVerificationMethodsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRecruiterVerificationMethods>
          }
          groupBy: {
            args: Prisma.RecruiterVerificationMethodsGroupByArgs<ExtArgs>
            result: $Utils.Optional<RecruiterVerificationMethodsGroupByOutputType>[]
          }
          count: {
            args: Prisma.RecruiterVerificationMethodsCountArgs<ExtArgs>
            result: $Utils.Optional<RecruiterVerificationMethodsCountAggregateOutputType> | number
          }
        }
      }
      SavedJob: {
        payload: Prisma.$SavedJobPayload<ExtArgs>
        fields: Prisma.SavedJobFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SavedJobFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedJobPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SavedJobFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedJobPayload>
          }
          findFirst: {
            args: Prisma.SavedJobFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedJobPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SavedJobFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedJobPayload>
          }
          findMany: {
            args: Prisma.SavedJobFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedJobPayload>[]
          }
          create: {
            args: Prisma.SavedJobCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedJobPayload>
          }
          createMany: {
            args: Prisma.SavedJobCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SavedJobCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedJobPayload>[]
          }
          delete: {
            args: Prisma.SavedJobDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedJobPayload>
          }
          update: {
            args: Prisma.SavedJobUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedJobPayload>
          }
          deleteMany: {
            args: Prisma.SavedJobDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SavedJobUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SavedJobUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedJobPayload>[]
          }
          upsert: {
            args: Prisma.SavedJobUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedJobPayload>
          }
          aggregate: {
            args: Prisma.SavedJobAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSavedJob>
          }
          groupBy: {
            args: Prisma.SavedJobGroupByArgs<ExtArgs>
            result: $Utils.Optional<SavedJobGroupByOutputType>[]
          }
          count: {
            args: Prisma.SavedJobCountArgs<ExtArgs>
            result: $Utils.Optional<SavedJobCountAggregateOutputType> | number
          }
        }
      }
      SkillUserMap: {
        payload: Prisma.$SkillUserMapPayload<ExtArgs>
        fields: Prisma.SkillUserMapFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SkillUserMapFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillUserMapPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SkillUserMapFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillUserMapPayload>
          }
          findFirst: {
            args: Prisma.SkillUserMapFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillUserMapPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SkillUserMapFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillUserMapPayload>
          }
          findMany: {
            args: Prisma.SkillUserMapFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillUserMapPayload>[]
          }
          create: {
            args: Prisma.SkillUserMapCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillUserMapPayload>
          }
          createMany: {
            args: Prisma.SkillUserMapCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SkillUserMapCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillUserMapPayload>[]
          }
          delete: {
            args: Prisma.SkillUserMapDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillUserMapPayload>
          }
          update: {
            args: Prisma.SkillUserMapUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillUserMapPayload>
          }
          deleteMany: {
            args: Prisma.SkillUserMapDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SkillUserMapUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SkillUserMapUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillUserMapPayload>[]
          }
          upsert: {
            args: Prisma.SkillUserMapUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillUserMapPayload>
          }
          aggregate: {
            args: Prisma.SkillUserMapAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSkillUserMap>
          }
          groupBy: {
            args: Prisma.SkillUserMapGroupByArgs<ExtArgs>
            result: $Utils.Optional<SkillUserMapGroupByOutputType>[]
          }
          count: {
            args: Prisma.SkillUserMapCountArgs<ExtArgs>
            result: $Utils.Optional<SkillUserMapCountAggregateOutputType> | number
          }
        }
      }
      Education: {
        payload: Prisma.$EducationPayload<ExtArgs>
        fields: Prisma.EducationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EducationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EducationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EducationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EducationPayload>
          }
          findFirst: {
            args: Prisma.EducationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EducationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EducationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EducationPayload>
          }
          findMany: {
            args: Prisma.EducationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EducationPayload>[]
          }
          create: {
            args: Prisma.EducationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EducationPayload>
          }
          createMany: {
            args: Prisma.EducationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EducationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EducationPayload>[]
          }
          delete: {
            args: Prisma.EducationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EducationPayload>
          }
          update: {
            args: Prisma.EducationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EducationPayload>
          }
          deleteMany: {
            args: Prisma.EducationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EducationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EducationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EducationPayload>[]
          }
          upsert: {
            args: Prisma.EducationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EducationPayload>
          }
          aggregate: {
            args: Prisma.EducationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEducation>
          }
          groupBy: {
            args: Prisma.EducationGroupByArgs<ExtArgs>
            result: $Utils.Optional<EducationGroupByOutputType>[]
          }
          count: {
            args: Prisma.EducationCountArgs<ExtArgs>
            result: $Utils.Optional<EducationCountAggregateOutputType> | number
          }
        }
      }
      Experience: {
        payload: Prisma.$ExperiencePayload<ExtArgs>
        fields: Prisma.ExperienceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ExperienceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperiencePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ExperienceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperiencePayload>
          }
          findFirst: {
            args: Prisma.ExperienceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperiencePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ExperienceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperiencePayload>
          }
          findMany: {
            args: Prisma.ExperienceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperiencePayload>[]
          }
          create: {
            args: Prisma.ExperienceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperiencePayload>
          }
          createMany: {
            args: Prisma.ExperienceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ExperienceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperiencePayload>[]
          }
          delete: {
            args: Prisma.ExperienceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperiencePayload>
          }
          update: {
            args: Prisma.ExperienceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperiencePayload>
          }
          deleteMany: {
            args: Prisma.ExperienceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ExperienceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ExperienceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperiencePayload>[]
          }
          upsert: {
            args: Prisma.ExperienceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperiencePayload>
          }
          aggregate: {
            args: Prisma.ExperienceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExperience>
          }
          groupBy: {
            args: Prisma.ExperienceGroupByArgs<ExtArgs>
            result: $Utils.Optional<ExperienceGroupByOutputType>[]
          }
          count: {
            args: Prisma.ExperienceCountArgs<ExtArgs>
            result: $Utils.Optional<ExperienceCountAggregateOutputType> | number
          }
        }
      }
      Resume: {
        payload: Prisma.$ResumePayload<ExtArgs>
        fields: Prisma.ResumeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ResumeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ResumeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>
          }
          findFirst: {
            args: Prisma.ResumeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ResumeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>
          }
          findMany: {
            args: Prisma.ResumeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>[]
          }
          create: {
            args: Prisma.ResumeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>
          }
          createMany: {
            args: Prisma.ResumeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ResumeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>[]
          }
          delete: {
            args: Prisma.ResumeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>
          }
          update: {
            args: Prisma.ResumeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>
          }
          deleteMany: {
            args: Prisma.ResumeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ResumeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ResumeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>[]
          }
          upsert: {
            args: Prisma.ResumeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>
          }
          aggregate: {
            args: Prisma.ResumeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateResume>
          }
          groupBy: {
            args: Prisma.ResumeGroupByArgs<ExtArgs>
            result: $Utils.Optional<ResumeGroupByOutputType>[]
          }
          count: {
            args: Prisma.ResumeCountArgs<ExtArgs>
            result: $Utils.Optional<ResumeCountAggregateOutputType> | number
          }
        }
      }
      NotificationPreferences: {
        payload: Prisma.$NotificationPreferencesPayload<ExtArgs>
        fields: Prisma.NotificationPreferencesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NotificationPreferencesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPreferencesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotificationPreferencesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPreferencesPayload>
          }
          findFirst: {
            args: Prisma.NotificationPreferencesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPreferencesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotificationPreferencesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPreferencesPayload>
          }
          findMany: {
            args: Prisma.NotificationPreferencesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPreferencesPayload>[]
          }
          create: {
            args: Prisma.NotificationPreferencesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPreferencesPayload>
          }
          createMany: {
            args: Prisma.NotificationPreferencesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NotificationPreferencesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPreferencesPayload>[]
          }
          delete: {
            args: Prisma.NotificationPreferencesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPreferencesPayload>
          }
          update: {
            args: Prisma.NotificationPreferencesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPreferencesPayload>
          }
          deleteMany: {
            args: Prisma.NotificationPreferencesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NotificationPreferencesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NotificationPreferencesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPreferencesPayload>[]
          }
          upsert: {
            args: Prisma.NotificationPreferencesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPreferencesPayload>
          }
          aggregate: {
            args: Prisma.NotificationPreferencesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotificationPreferences>
          }
          groupBy: {
            args: Prisma.NotificationPreferencesGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificationPreferencesGroupByOutputType>[]
          }
          count: {
            args: Prisma.NotificationPreferencesCountArgs<ExtArgs>
            result: $Utils.Optional<NotificationPreferencesCountAggregateOutputType> | number
          }
        }
      }
      JobSearchPreferences: {
        payload: Prisma.$JobSearchPreferencesPayload<ExtArgs>
        fields: Prisma.JobSearchPreferencesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.JobSearchPreferencesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobSearchPreferencesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.JobSearchPreferencesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobSearchPreferencesPayload>
          }
          findFirst: {
            args: Prisma.JobSearchPreferencesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobSearchPreferencesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.JobSearchPreferencesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobSearchPreferencesPayload>
          }
          findMany: {
            args: Prisma.JobSearchPreferencesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobSearchPreferencesPayload>[]
          }
          create: {
            args: Prisma.JobSearchPreferencesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobSearchPreferencesPayload>
          }
          createMany: {
            args: Prisma.JobSearchPreferencesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.JobSearchPreferencesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobSearchPreferencesPayload>[]
          }
          delete: {
            args: Prisma.JobSearchPreferencesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobSearchPreferencesPayload>
          }
          update: {
            args: Prisma.JobSearchPreferencesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobSearchPreferencesPayload>
          }
          deleteMany: {
            args: Prisma.JobSearchPreferencesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.JobSearchPreferencesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.JobSearchPreferencesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobSearchPreferencesPayload>[]
          }
          upsert: {
            args: Prisma.JobSearchPreferencesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobSearchPreferencesPayload>
          }
          aggregate: {
            args: Prisma.JobSearchPreferencesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateJobSearchPreferences>
          }
          groupBy: {
            args: Prisma.JobSearchPreferencesGroupByArgs<ExtArgs>
            result: $Utils.Optional<JobSearchPreferencesGroupByOutputType>[]
          }
          count: {
            args: Prisma.JobSearchPreferencesCountArgs<ExtArgs>
            result: $Utils.Optional<JobSearchPreferencesCountAggregateOutputType> | number
          }
        }
      }
      FCMToken: {
        payload: Prisma.$FCMTokenPayload<ExtArgs>
        fields: Prisma.FCMTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FCMTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FCMTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FCMTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FCMTokenPayload>
          }
          findFirst: {
            args: Prisma.FCMTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FCMTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FCMTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FCMTokenPayload>
          }
          findMany: {
            args: Prisma.FCMTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FCMTokenPayload>[]
          }
          create: {
            args: Prisma.FCMTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FCMTokenPayload>
          }
          createMany: {
            args: Prisma.FCMTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FCMTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FCMTokenPayload>[]
          }
          delete: {
            args: Prisma.FCMTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FCMTokenPayload>
          }
          update: {
            args: Prisma.FCMTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FCMTokenPayload>
          }
          deleteMany: {
            args: Prisma.FCMTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FCMTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FCMTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FCMTokenPayload>[]
          }
          upsert: {
            args: Prisma.FCMTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FCMTokenPayload>
          }
          aggregate: {
            args: Prisma.FCMTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFCMToken>
          }
          groupBy: {
            args: Prisma.FCMTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<FCMTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.FCMTokenCountArgs<ExtArgs>
            result: $Utils.Optional<FCMTokenCountAggregateOutputType> | number
          }
        }
      }
      OTP: {
        payload: Prisma.$OTPPayload<ExtArgs>
        fields: Prisma.OTPFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OTPFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OTPPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OTPFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OTPPayload>
          }
          findFirst: {
            args: Prisma.OTPFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OTPPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OTPFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OTPPayload>
          }
          findMany: {
            args: Prisma.OTPFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OTPPayload>[]
          }
          create: {
            args: Prisma.OTPCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OTPPayload>
          }
          createMany: {
            args: Prisma.OTPCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OTPCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OTPPayload>[]
          }
          delete: {
            args: Prisma.OTPDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OTPPayload>
          }
          update: {
            args: Prisma.OTPUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OTPPayload>
          }
          deleteMany: {
            args: Prisma.OTPDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OTPUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OTPUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OTPPayload>[]
          }
          upsert: {
            args: Prisma.OTPUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OTPPayload>
          }
          aggregate: {
            args: Prisma.OTPAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOTP>
          }
          groupBy: {
            args: Prisma.OTPGroupByArgs<ExtArgs>
            result: $Utils.Optional<OTPGroupByOutputType>[]
          }
          count: {
            args: Prisma.OTPCountArgs<ExtArgs>
            result: $Utils.Optional<OTPCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    profile?: ProfileOmit
    recruiterProfile?: RecruiterProfileOmit
    recruiterVerificationMethods?: RecruiterVerificationMethodsOmit
    savedJob?: SavedJobOmit
    skillUserMap?: SkillUserMapOmit
    education?: EducationOmit
    experience?: ExperienceOmit
    resume?: ResumeOmit
    notificationPreferences?: NotificationPreferencesOmit
    jobSearchPreferences?: JobSearchPreferencesOmit
    fCMToken?: FCMTokenOmit
    oTP?: OTPOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    profiles: number
    savedJobs: number
    fcmTokens: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profiles?: boolean | UserCountOutputTypeCountProfilesArgs
    savedJobs?: boolean | UserCountOutputTypeCountSavedJobsArgs
    fcmTokens?: boolean | UserCountOutputTypeCountFcmTokensArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountProfilesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfileWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSavedJobsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SavedJobWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFcmTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FCMTokenWhereInput
  }


  /**
   * Count Type ProfileCountOutputType
   */

  export type ProfileCountOutputType = {
    education: number
    experience: number
    skillUserMap: number
    resumes: number
  }

  export type ProfileCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    education?: boolean | ProfileCountOutputTypeCountEducationArgs
    experience?: boolean | ProfileCountOutputTypeCountExperienceArgs
    skillUserMap?: boolean | ProfileCountOutputTypeCountSkillUserMapArgs
    resumes?: boolean | ProfileCountOutputTypeCountResumesArgs
  }

  // Custom InputTypes
  /**
   * ProfileCountOutputType without action
   */
  export type ProfileCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileCountOutputType
     */
    select?: ProfileCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProfileCountOutputType without action
   */
  export type ProfileCountOutputTypeCountEducationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EducationWhereInput
  }

  /**
   * ProfileCountOutputType without action
   */
  export type ProfileCountOutputTypeCountExperienceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExperienceWhereInput
  }

  /**
   * ProfileCountOutputType without action
   */
  export type ProfileCountOutputTypeCountSkillUserMapArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SkillUserMapWhereInput
  }

  /**
   * ProfileCountOutputType without action
   */
  export type ProfileCountOutputTypeCountResumesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResumeWhereInput
  }


  /**
   * Count Type RecruiterVerificationMethodsCountOutputType
   */

  export type RecruiterVerificationMethodsCountOutputType = {
    RecruiterProfile: number
  }

  export type RecruiterVerificationMethodsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    RecruiterProfile?: boolean | RecruiterVerificationMethodsCountOutputTypeCountRecruiterProfileArgs
  }

  // Custom InputTypes
  /**
   * RecruiterVerificationMethodsCountOutputType without action
   */
  export type RecruiterVerificationMethodsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecruiterVerificationMethodsCountOutputType
     */
    select?: RecruiterVerificationMethodsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RecruiterVerificationMethodsCountOutputType without action
   */
  export type RecruiterVerificationMethodsCountOutputTypeCountRecruiterProfileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RecruiterProfileWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    phoneNumber: string | null
    countryCode: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    phoneNumber: string | null
    countryCode: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    phoneNumber: number
    countryCode: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    phoneNumber?: true
    countryCode?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    phoneNumber?: true
    countryCode?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    phoneNumber?: true
    countryCode?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    phoneNumber: string
    countryCode: string
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    phoneNumber?: boolean
    countryCode?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    profiles?: boolean | User$profilesArgs<ExtArgs>
    savedJobs?: boolean | User$savedJobsArgs<ExtArgs>
    jobSearchPreferences?: boolean | User$jobSearchPreferencesArgs<ExtArgs>
    notificationPreferences?: boolean | User$notificationPreferencesArgs<ExtArgs>
    fcmTokens?: boolean | User$fcmTokensArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    phoneNumber?: boolean
    countryCode?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    phoneNumber?: boolean
    countryCode?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    phoneNumber?: boolean
    countryCode?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "phoneNumber" | "countryCode" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profiles?: boolean | User$profilesArgs<ExtArgs>
    savedJobs?: boolean | User$savedJobsArgs<ExtArgs>
    jobSearchPreferences?: boolean | User$jobSearchPreferencesArgs<ExtArgs>
    notificationPreferences?: boolean | User$notificationPreferencesArgs<ExtArgs>
    fcmTokens?: boolean | User$fcmTokensArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      profiles: Prisma.$ProfilePayload<ExtArgs>[]
      savedJobs: Prisma.$SavedJobPayload<ExtArgs>[]
      jobSearchPreferences: Prisma.$JobSearchPreferencesPayload<ExtArgs> | null
      notificationPreferences: Prisma.$NotificationPreferencesPayload<ExtArgs> | null
      fcmTokens: Prisma.$FCMTokenPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      phoneNumber: string
      countryCode: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    profiles<T extends User$profilesArgs<ExtArgs> = {}>(args?: Subset<T, User$profilesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    savedJobs<T extends User$savedJobsArgs<ExtArgs> = {}>(args?: Subset<T, User$savedJobsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SavedJobPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    jobSearchPreferences<T extends User$jobSearchPreferencesArgs<ExtArgs> = {}>(args?: Subset<T, User$jobSearchPreferencesArgs<ExtArgs>>): Prisma__JobSearchPreferencesClient<$Result.GetResult<Prisma.$JobSearchPreferencesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    notificationPreferences<T extends User$notificationPreferencesArgs<ExtArgs> = {}>(args?: Subset<T, User$notificationPreferencesArgs<ExtArgs>>): Prisma__NotificationPreferencesClient<$Result.GetResult<Prisma.$NotificationPreferencesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    fcmTokens<T extends User$fcmTokensArgs<ExtArgs> = {}>(args?: Subset<T, User$fcmTokensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FCMTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly phoneNumber: FieldRef<"User", 'String'>
    readonly countryCode: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.profiles
   */
  export type User$profilesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    where?: ProfileWhereInput
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    cursor?: ProfileWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * User.savedJobs
   */
  export type User$savedJobsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedJob
     */
    select?: SavedJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedJob
     */
    omit?: SavedJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedJobInclude<ExtArgs> | null
    where?: SavedJobWhereInput
    orderBy?: SavedJobOrderByWithRelationInput | SavedJobOrderByWithRelationInput[]
    cursor?: SavedJobWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SavedJobScalarFieldEnum | SavedJobScalarFieldEnum[]
  }

  /**
   * User.jobSearchPreferences
   */
  export type User$jobSearchPreferencesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobSearchPreferences
     */
    select?: JobSearchPreferencesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobSearchPreferences
     */
    omit?: JobSearchPreferencesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobSearchPreferencesInclude<ExtArgs> | null
    where?: JobSearchPreferencesWhereInput
  }

  /**
   * User.notificationPreferences
   */
  export type User$notificationPreferencesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPreferences
     */
    select?: NotificationPreferencesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationPreferences
     */
    omit?: NotificationPreferencesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationPreferencesInclude<ExtArgs> | null
    where?: NotificationPreferencesWhereInput
  }

  /**
   * User.fcmTokens
   */
  export type User$fcmTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FCMToken
     */
    select?: FCMTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FCMToken
     */
    omit?: FCMTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FCMTokenInclude<ExtArgs> | null
    where?: FCMTokenWhereInput
    orderBy?: FCMTokenOrderByWithRelationInput | FCMTokenOrderByWithRelationInput[]
    cursor?: FCMTokenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FCMTokenScalarFieldEnum | FCMTokenScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Profile
   */

  export type AggregateProfile = {
    _count: ProfileCountAggregateOutputType | null
    _min: ProfileMinAggregateOutputType | null
    _max: ProfileMaxAggregateOutputType | null
  }

  export type ProfileMinAggregateOutputType = {
    id: string | null
    userId: string | null
    jobRoleId: string | null
    fullName: string | null
    email: string | null
    bio: string | null
    location: string | null
    expectedSalary: string | null
    yearsOfExperience: string | null
    availableToStart: string | null
    immediateJoiner: boolean | null
    preferredRole: string | null
    profilePicture: string | null
    cvLink: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProfileMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    jobRoleId: string | null
    fullName: string | null
    email: string | null
    bio: string | null
    location: string | null
    expectedSalary: string | null
    yearsOfExperience: string | null
    availableToStart: string | null
    immediateJoiner: boolean | null
    preferredRole: string | null
    profilePicture: string | null
    cvLink: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProfileCountAggregateOutputType = {
    id: number
    userId: number
    jobRoleId: number
    fullName: number
    email: number
    bio: number
    location: number
    expectedSalary: number
    yearsOfExperience: number
    availableToStart: number
    immediateJoiner: number
    preferredRole: number
    profilePicture: number
    cvLink: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProfileMinAggregateInputType = {
    id?: true
    userId?: true
    jobRoleId?: true
    fullName?: true
    email?: true
    bio?: true
    location?: true
    expectedSalary?: true
    yearsOfExperience?: true
    availableToStart?: true
    immediateJoiner?: true
    preferredRole?: true
    profilePicture?: true
    cvLink?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProfileMaxAggregateInputType = {
    id?: true
    userId?: true
    jobRoleId?: true
    fullName?: true
    email?: true
    bio?: true
    location?: true
    expectedSalary?: true
    yearsOfExperience?: true
    availableToStart?: true
    immediateJoiner?: true
    preferredRole?: true
    profilePicture?: true
    cvLink?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProfileCountAggregateInputType = {
    id?: true
    userId?: true
    jobRoleId?: true
    fullName?: true
    email?: true
    bio?: true
    location?: true
    expectedSalary?: true
    yearsOfExperience?: true
    availableToStart?: true
    immediateJoiner?: true
    preferredRole?: true
    profilePicture?: true
    cvLink?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Profile to aggregate.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Profiles
    **/
    _count?: true | ProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProfileMaxAggregateInputType
  }

  export type GetProfileAggregateType<T extends ProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProfile[P]>
      : GetScalarType<T[P], AggregateProfile[P]>
  }




  export type ProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfileWhereInput
    orderBy?: ProfileOrderByWithAggregationInput | ProfileOrderByWithAggregationInput[]
    by: ProfileScalarFieldEnum[] | ProfileScalarFieldEnum
    having?: ProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProfileCountAggregateInputType | true
    _min?: ProfileMinAggregateInputType
    _max?: ProfileMaxAggregateInputType
  }

  export type ProfileGroupByOutputType = {
    id: string
    userId: string
    jobRoleId: string | null
    fullName: string | null
    email: string | null
    bio: string | null
    location: string | null
    expectedSalary: string | null
    yearsOfExperience: string | null
    availableToStart: string | null
    immediateJoiner: boolean | null
    preferredRole: string | null
    profilePicture: string | null
    cvLink: string | null
    createdAt: Date
    updatedAt: Date
    _count: ProfileCountAggregateOutputType | null
    _min: ProfileMinAggregateOutputType | null
    _max: ProfileMaxAggregateOutputType | null
  }

  type GetProfileGroupByPayload<T extends ProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProfileGroupByOutputType[P]>
            : GetScalarType<T[P], ProfileGroupByOutputType[P]>
        }
      >
    >


  export type ProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    jobRoleId?: boolean
    fullName?: boolean
    email?: boolean
    bio?: boolean
    location?: boolean
    expectedSalary?: boolean
    yearsOfExperience?: boolean
    availableToStart?: boolean
    immediateJoiner?: boolean
    preferredRole?: boolean
    profilePicture?: boolean
    cvLink?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    education?: boolean | Profile$educationArgs<ExtArgs>
    experience?: boolean | Profile$experienceArgs<ExtArgs>
    skillUserMap?: boolean | Profile$skillUserMapArgs<ExtArgs>
    resumes?: boolean | Profile$resumesArgs<ExtArgs>
    _count?: boolean | ProfileCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["profile"]>

  export type ProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    jobRoleId?: boolean
    fullName?: boolean
    email?: boolean
    bio?: boolean
    location?: boolean
    expectedSalary?: boolean
    yearsOfExperience?: boolean
    availableToStart?: boolean
    immediateJoiner?: boolean
    preferredRole?: boolean
    profilePicture?: boolean
    cvLink?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["profile"]>

  export type ProfileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    jobRoleId?: boolean
    fullName?: boolean
    email?: boolean
    bio?: boolean
    location?: boolean
    expectedSalary?: boolean
    yearsOfExperience?: boolean
    availableToStart?: boolean
    immediateJoiner?: boolean
    preferredRole?: boolean
    profilePicture?: boolean
    cvLink?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["profile"]>

  export type ProfileSelectScalar = {
    id?: boolean
    userId?: boolean
    jobRoleId?: boolean
    fullName?: boolean
    email?: boolean
    bio?: boolean
    location?: boolean
    expectedSalary?: boolean
    yearsOfExperience?: boolean
    availableToStart?: boolean
    immediateJoiner?: boolean
    preferredRole?: boolean
    profilePicture?: boolean
    cvLink?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "jobRoleId" | "fullName" | "email" | "bio" | "location" | "expectedSalary" | "yearsOfExperience" | "availableToStart" | "immediateJoiner" | "preferredRole" | "profilePicture" | "cvLink" | "createdAt" | "updatedAt", ExtArgs["result"]["profile"]>
  export type ProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    education?: boolean | Profile$educationArgs<ExtArgs>
    experience?: boolean | Profile$experienceArgs<ExtArgs>
    skillUserMap?: boolean | Profile$skillUserMapArgs<ExtArgs>
    resumes?: boolean | Profile$resumesArgs<ExtArgs>
    _count?: boolean | ProfileCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ProfileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Profile"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      education: Prisma.$EducationPayload<ExtArgs>[]
      experience: Prisma.$ExperiencePayload<ExtArgs>[]
      skillUserMap: Prisma.$SkillUserMapPayload<ExtArgs>[]
      resumes: Prisma.$ResumePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      jobRoleId: string | null
      fullName: string | null
      email: string | null
      bio: string | null
      location: string | null
      expectedSalary: string | null
      yearsOfExperience: string | null
      availableToStart: string | null
      immediateJoiner: boolean | null
      preferredRole: string | null
      profilePicture: string | null
      cvLink: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["profile"]>
    composites: {}
  }

  type ProfileGetPayload<S extends boolean | null | undefined | ProfileDefaultArgs> = $Result.GetResult<Prisma.$ProfilePayload, S>

  type ProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProfileCountAggregateInputType | true
    }

  export interface ProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Profile'], meta: { name: 'Profile' } }
    /**
     * Find zero or one Profile that matches the filter.
     * @param {ProfileFindUniqueArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProfileFindUniqueArgs>(args: SelectSubset<T, ProfileFindUniqueArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Profile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProfileFindUniqueOrThrowArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, ProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Profile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindFirstArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProfileFindFirstArgs>(args?: SelectSubset<T, ProfileFindFirstArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Profile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindFirstOrThrowArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, ProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Profiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Profiles
     * const profiles = await prisma.profile.findMany()
     * 
     * // Get first 10 Profiles
     * const profiles = await prisma.profile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const profileWithIdOnly = await prisma.profile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProfileFindManyArgs>(args?: SelectSubset<T, ProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Profile.
     * @param {ProfileCreateArgs} args - Arguments to create a Profile.
     * @example
     * // Create one Profile
     * const Profile = await prisma.profile.create({
     *   data: {
     *     // ... data to create a Profile
     *   }
     * })
     * 
     */
    create<T extends ProfileCreateArgs>(args: SelectSubset<T, ProfileCreateArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Profiles.
     * @param {ProfileCreateManyArgs} args - Arguments to create many Profiles.
     * @example
     * // Create many Profiles
     * const profile = await prisma.profile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProfileCreateManyArgs>(args?: SelectSubset<T, ProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Profiles and returns the data saved in the database.
     * @param {ProfileCreateManyAndReturnArgs} args - Arguments to create many Profiles.
     * @example
     * // Create many Profiles
     * const profile = await prisma.profile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Profiles and only return the `id`
     * const profileWithIdOnly = await prisma.profile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, ProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Profile.
     * @param {ProfileDeleteArgs} args - Arguments to delete one Profile.
     * @example
     * // Delete one Profile
     * const Profile = await prisma.profile.delete({
     *   where: {
     *     // ... filter to delete one Profile
     *   }
     * })
     * 
     */
    delete<T extends ProfileDeleteArgs>(args: SelectSubset<T, ProfileDeleteArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Profile.
     * @param {ProfileUpdateArgs} args - Arguments to update one Profile.
     * @example
     * // Update one Profile
     * const profile = await prisma.profile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProfileUpdateArgs>(args: SelectSubset<T, ProfileUpdateArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Profiles.
     * @param {ProfileDeleteManyArgs} args - Arguments to filter Profiles to delete.
     * @example
     * // Delete a few Profiles
     * const { count } = await prisma.profile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProfileDeleteManyArgs>(args?: SelectSubset<T, ProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Profiles
     * const profile = await prisma.profile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProfileUpdateManyArgs>(args: SelectSubset<T, ProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Profiles and returns the data updated in the database.
     * @param {ProfileUpdateManyAndReturnArgs} args - Arguments to update many Profiles.
     * @example
     * // Update many Profiles
     * const profile = await prisma.profile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Profiles and only return the `id`
     * const profileWithIdOnly = await prisma.profile.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProfileUpdateManyAndReturnArgs>(args: SelectSubset<T, ProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Profile.
     * @param {ProfileUpsertArgs} args - Arguments to update or create a Profile.
     * @example
     * // Update or create a Profile
     * const profile = await prisma.profile.upsert({
     *   create: {
     *     // ... data to create a Profile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Profile we want to update
     *   }
     * })
     */
    upsert<T extends ProfileUpsertArgs>(args: SelectSubset<T, ProfileUpsertArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileCountArgs} args - Arguments to filter Profiles to count.
     * @example
     * // Count the number of Profiles
     * const count = await prisma.profile.count({
     *   where: {
     *     // ... the filter for the Profiles we want to count
     *   }
     * })
    **/
    count<T extends ProfileCountArgs>(
      args?: Subset<T, ProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Profile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProfileAggregateArgs>(args: Subset<T, ProfileAggregateArgs>): Prisma.PrismaPromise<GetProfileAggregateType<T>>

    /**
     * Group by Profile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProfileGroupByArgs['orderBy'] }
        : { orderBy?: ProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Profile model
   */
  readonly fields: ProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Profile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    education<T extends Profile$educationArgs<ExtArgs> = {}>(args?: Subset<T, Profile$educationArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EducationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    experience<T extends Profile$experienceArgs<ExtArgs> = {}>(args?: Subset<T, Profile$experienceArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExperiencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    skillUserMap<T extends Profile$skillUserMapArgs<ExtArgs> = {}>(args?: Subset<T, Profile$skillUserMapArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SkillUserMapPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    resumes<T extends Profile$resumesArgs<ExtArgs> = {}>(args?: Subset<T, Profile$resumesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Profile model
   */
  interface ProfileFieldRefs {
    readonly id: FieldRef<"Profile", 'String'>
    readonly userId: FieldRef<"Profile", 'String'>
    readonly jobRoleId: FieldRef<"Profile", 'String'>
    readonly fullName: FieldRef<"Profile", 'String'>
    readonly email: FieldRef<"Profile", 'String'>
    readonly bio: FieldRef<"Profile", 'String'>
    readonly location: FieldRef<"Profile", 'String'>
    readonly expectedSalary: FieldRef<"Profile", 'String'>
    readonly yearsOfExperience: FieldRef<"Profile", 'String'>
    readonly availableToStart: FieldRef<"Profile", 'String'>
    readonly immediateJoiner: FieldRef<"Profile", 'Boolean'>
    readonly preferredRole: FieldRef<"Profile", 'String'>
    readonly profilePicture: FieldRef<"Profile", 'String'>
    readonly cvLink: FieldRef<"Profile", 'String'>
    readonly createdAt: FieldRef<"Profile", 'DateTime'>
    readonly updatedAt: FieldRef<"Profile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Profile findUnique
   */
  export type ProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile findUniqueOrThrow
   */
  export type ProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile findFirst
   */
  export type ProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Profiles.
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Profiles.
     */
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * Profile findFirstOrThrow
   */
  export type ProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Profiles.
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Profiles.
     */
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * Profile findMany
   */
  export type ProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profiles to fetch.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Profiles.
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * Profile create
   */
  export type ProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a Profile.
     */
    data: XOR<ProfileCreateInput, ProfileUncheckedCreateInput>
  }

  /**
   * Profile createMany
   */
  export type ProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Profiles.
     */
    data: ProfileCreateManyInput | ProfileCreateManyInput[]
  }

  /**
   * Profile createManyAndReturn
   */
  export type ProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * The data used to create many Profiles.
     */
    data: ProfileCreateManyInput | ProfileCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Profile update
   */
  export type ProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a Profile.
     */
    data: XOR<ProfileUpdateInput, ProfileUncheckedUpdateInput>
    /**
     * Choose, which Profile to update.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile updateMany
   */
  export type ProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Profiles.
     */
    data: XOR<ProfileUpdateManyMutationInput, ProfileUncheckedUpdateManyInput>
    /**
     * Filter which Profiles to update
     */
    where?: ProfileWhereInput
    /**
     * Limit how many Profiles to update.
     */
    limit?: number
  }

  /**
   * Profile updateManyAndReturn
   */
  export type ProfileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * The data used to update Profiles.
     */
    data: XOR<ProfileUpdateManyMutationInput, ProfileUncheckedUpdateManyInput>
    /**
     * Filter which Profiles to update
     */
    where?: ProfileWhereInput
    /**
     * Limit how many Profiles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Profile upsert
   */
  export type ProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the Profile to update in case it exists.
     */
    where: ProfileWhereUniqueInput
    /**
     * In case the Profile found by the `where` argument doesn't exist, create a new Profile with this data.
     */
    create: XOR<ProfileCreateInput, ProfileUncheckedCreateInput>
    /**
     * In case the Profile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProfileUpdateInput, ProfileUncheckedUpdateInput>
  }

  /**
   * Profile delete
   */
  export type ProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter which Profile to delete.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile deleteMany
   */
  export type ProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Profiles to delete
     */
    where?: ProfileWhereInput
    /**
     * Limit how many Profiles to delete.
     */
    limit?: number
  }

  /**
   * Profile.education
   */
  export type Profile$educationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Education
     */
    select?: EducationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Education
     */
    omit?: EducationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EducationInclude<ExtArgs> | null
    where?: EducationWhereInput
    orderBy?: EducationOrderByWithRelationInput | EducationOrderByWithRelationInput[]
    cursor?: EducationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EducationScalarFieldEnum | EducationScalarFieldEnum[]
  }

  /**
   * Profile.experience
   */
  export type Profile$experienceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Experience
     */
    select?: ExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Experience
     */
    omit?: ExperienceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperienceInclude<ExtArgs> | null
    where?: ExperienceWhereInput
    orderBy?: ExperienceOrderByWithRelationInput | ExperienceOrderByWithRelationInput[]
    cursor?: ExperienceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExperienceScalarFieldEnum | ExperienceScalarFieldEnum[]
  }

  /**
   * Profile.skillUserMap
   */
  export type Profile$skillUserMapArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkillUserMap
     */
    select?: SkillUserMapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkillUserMap
     */
    omit?: SkillUserMapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillUserMapInclude<ExtArgs> | null
    where?: SkillUserMapWhereInput
    orderBy?: SkillUserMapOrderByWithRelationInput | SkillUserMapOrderByWithRelationInput[]
    cursor?: SkillUserMapWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SkillUserMapScalarFieldEnum | SkillUserMapScalarFieldEnum[]
  }

  /**
   * Profile.resumes
   */
  export type Profile$resumesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    where?: ResumeWhereInput
    orderBy?: ResumeOrderByWithRelationInput | ResumeOrderByWithRelationInput[]
    cursor?: ResumeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ResumeScalarFieldEnum | ResumeScalarFieldEnum[]
  }

  /**
   * Profile without action
   */
  export type ProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
  }


  /**
   * Model RecruiterProfile
   */

  export type AggregateRecruiterProfile = {
    _count: RecruiterProfileCountAggregateOutputType | null
    _min: RecruiterProfileMinAggregateOutputType | null
    _max: RecruiterProfileMaxAggregateOutputType | null
  }

  export type RecruiterProfileMinAggregateOutputType = {
    id: string | null
    userId: string | null
    fullName: string | null
    companyId: string | null
    jobRoleId: string | null
    workEmail: string | null
    location: string | null
    isVerified: boolean | null
    recruiterVerificationMethodsId: string | null
    verifiedBy: string | null
    verificationDetails: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RecruiterProfileMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    fullName: string | null
    companyId: string | null
    jobRoleId: string | null
    workEmail: string | null
    location: string | null
    isVerified: boolean | null
    recruiterVerificationMethodsId: string | null
    verifiedBy: string | null
    verificationDetails: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RecruiterProfileCountAggregateOutputType = {
    id: number
    userId: number
    fullName: number
    companyId: number
    jobRoleId: number
    workEmail: number
    location: number
    isVerified: number
    recruiterVerificationMethodsId: number
    verifiedBy: number
    verificationDetails: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RecruiterProfileMinAggregateInputType = {
    id?: true
    userId?: true
    fullName?: true
    companyId?: true
    jobRoleId?: true
    workEmail?: true
    location?: true
    isVerified?: true
    recruiterVerificationMethodsId?: true
    verifiedBy?: true
    verificationDetails?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RecruiterProfileMaxAggregateInputType = {
    id?: true
    userId?: true
    fullName?: true
    companyId?: true
    jobRoleId?: true
    workEmail?: true
    location?: true
    isVerified?: true
    recruiterVerificationMethodsId?: true
    verifiedBy?: true
    verificationDetails?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RecruiterProfileCountAggregateInputType = {
    id?: true
    userId?: true
    fullName?: true
    companyId?: true
    jobRoleId?: true
    workEmail?: true
    location?: true
    isVerified?: true
    recruiterVerificationMethodsId?: true
    verifiedBy?: true
    verificationDetails?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RecruiterProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RecruiterProfile to aggregate.
     */
    where?: RecruiterProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecruiterProfiles to fetch.
     */
    orderBy?: RecruiterProfileOrderByWithRelationInput | RecruiterProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RecruiterProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecruiterProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecruiterProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RecruiterProfiles
    **/
    _count?: true | RecruiterProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RecruiterProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RecruiterProfileMaxAggregateInputType
  }

  export type GetRecruiterProfileAggregateType<T extends RecruiterProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateRecruiterProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRecruiterProfile[P]>
      : GetScalarType<T[P], AggregateRecruiterProfile[P]>
  }




  export type RecruiterProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RecruiterProfileWhereInput
    orderBy?: RecruiterProfileOrderByWithAggregationInput | RecruiterProfileOrderByWithAggregationInput[]
    by: RecruiterProfileScalarFieldEnum[] | RecruiterProfileScalarFieldEnum
    having?: RecruiterProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RecruiterProfileCountAggregateInputType | true
    _min?: RecruiterProfileMinAggregateInputType
    _max?: RecruiterProfileMaxAggregateInputType
  }

  export type RecruiterProfileGroupByOutputType = {
    id: string
    userId: string
    fullName: string | null
    companyId: string | null
    jobRoleId: string | null
    workEmail: string | null
    location: string | null
    isVerified: boolean
    recruiterVerificationMethodsId: string | null
    verifiedBy: string | null
    verificationDetails: string | null
    createdAt: Date
    updatedAt: Date
    _count: RecruiterProfileCountAggregateOutputType | null
    _min: RecruiterProfileMinAggregateOutputType | null
    _max: RecruiterProfileMaxAggregateOutputType | null
  }

  type GetRecruiterProfileGroupByPayload<T extends RecruiterProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RecruiterProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RecruiterProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RecruiterProfileGroupByOutputType[P]>
            : GetScalarType<T[P], RecruiterProfileGroupByOutputType[P]>
        }
      >
    >


  export type RecruiterProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    fullName?: boolean
    companyId?: boolean
    jobRoleId?: boolean
    workEmail?: boolean
    location?: boolean
    isVerified?: boolean
    recruiterVerificationMethodsId?: boolean
    verifiedBy?: boolean
    verificationDetails?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    recruiterVerificationMethods?: boolean | RecruiterProfile$recruiterVerificationMethodsArgs<ExtArgs>
  }, ExtArgs["result"]["recruiterProfile"]>

  export type RecruiterProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    fullName?: boolean
    companyId?: boolean
    jobRoleId?: boolean
    workEmail?: boolean
    location?: boolean
    isVerified?: boolean
    recruiterVerificationMethodsId?: boolean
    verifiedBy?: boolean
    verificationDetails?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    recruiterVerificationMethods?: boolean | RecruiterProfile$recruiterVerificationMethodsArgs<ExtArgs>
  }, ExtArgs["result"]["recruiterProfile"]>

  export type RecruiterProfileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    fullName?: boolean
    companyId?: boolean
    jobRoleId?: boolean
    workEmail?: boolean
    location?: boolean
    isVerified?: boolean
    recruiterVerificationMethodsId?: boolean
    verifiedBy?: boolean
    verificationDetails?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    recruiterVerificationMethods?: boolean | RecruiterProfile$recruiterVerificationMethodsArgs<ExtArgs>
  }, ExtArgs["result"]["recruiterProfile"]>

  export type RecruiterProfileSelectScalar = {
    id?: boolean
    userId?: boolean
    fullName?: boolean
    companyId?: boolean
    jobRoleId?: boolean
    workEmail?: boolean
    location?: boolean
    isVerified?: boolean
    recruiterVerificationMethodsId?: boolean
    verifiedBy?: boolean
    verificationDetails?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RecruiterProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "fullName" | "companyId" | "jobRoleId" | "workEmail" | "location" | "isVerified" | "recruiterVerificationMethodsId" | "verifiedBy" | "verificationDetails" | "createdAt" | "updatedAt", ExtArgs["result"]["recruiterProfile"]>
  export type RecruiterProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    recruiterVerificationMethods?: boolean | RecruiterProfile$recruiterVerificationMethodsArgs<ExtArgs>
  }
  export type RecruiterProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    recruiterVerificationMethods?: boolean | RecruiterProfile$recruiterVerificationMethodsArgs<ExtArgs>
  }
  export type RecruiterProfileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    recruiterVerificationMethods?: boolean | RecruiterProfile$recruiterVerificationMethodsArgs<ExtArgs>
  }

  export type $RecruiterProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RecruiterProfile"
    objects: {
      recruiterVerificationMethods: Prisma.$RecruiterVerificationMethodsPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      fullName: string | null
      companyId: string | null
      jobRoleId: string | null
      workEmail: string | null
      location: string | null
      isVerified: boolean
      recruiterVerificationMethodsId: string | null
      verifiedBy: string | null
      verificationDetails: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["recruiterProfile"]>
    composites: {}
  }

  type RecruiterProfileGetPayload<S extends boolean | null | undefined | RecruiterProfileDefaultArgs> = $Result.GetResult<Prisma.$RecruiterProfilePayload, S>

  type RecruiterProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RecruiterProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RecruiterProfileCountAggregateInputType | true
    }

  export interface RecruiterProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RecruiterProfile'], meta: { name: 'RecruiterProfile' } }
    /**
     * Find zero or one RecruiterProfile that matches the filter.
     * @param {RecruiterProfileFindUniqueArgs} args - Arguments to find a RecruiterProfile
     * @example
     * // Get one RecruiterProfile
     * const recruiterProfile = await prisma.recruiterProfile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RecruiterProfileFindUniqueArgs>(args: SelectSubset<T, RecruiterProfileFindUniqueArgs<ExtArgs>>): Prisma__RecruiterProfileClient<$Result.GetResult<Prisma.$RecruiterProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RecruiterProfile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RecruiterProfileFindUniqueOrThrowArgs} args - Arguments to find a RecruiterProfile
     * @example
     * // Get one RecruiterProfile
     * const recruiterProfile = await prisma.recruiterProfile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RecruiterProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, RecruiterProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RecruiterProfileClient<$Result.GetResult<Prisma.$RecruiterProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RecruiterProfile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecruiterProfileFindFirstArgs} args - Arguments to find a RecruiterProfile
     * @example
     * // Get one RecruiterProfile
     * const recruiterProfile = await prisma.recruiterProfile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RecruiterProfileFindFirstArgs>(args?: SelectSubset<T, RecruiterProfileFindFirstArgs<ExtArgs>>): Prisma__RecruiterProfileClient<$Result.GetResult<Prisma.$RecruiterProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RecruiterProfile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecruiterProfileFindFirstOrThrowArgs} args - Arguments to find a RecruiterProfile
     * @example
     * // Get one RecruiterProfile
     * const recruiterProfile = await prisma.recruiterProfile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RecruiterProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, RecruiterProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__RecruiterProfileClient<$Result.GetResult<Prisma.$RecruiterProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RecruiterProfiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecruiterProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RecruiterProfiles
     * const recruiterProfiles = await prisma.recruiterProfile.findMany()
     * 
     * // Get first 10 RecruiterProfiles
     * const recruiterProfiles = await prisma.recruiterProfile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const recruiterProfileWithIdOnly = await prisma.recruiterProfile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RecruiterProfileFindManyArgs>(args?: SelectSubset<T, RecruiterProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecruiterProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RecruiterProfile.
     * @param {RecruiterProfileCreateArgs} args - Arguments to create a RecruiterProfile.
     * @example
     * // Create one RecruiterProfile
     * const RecruiterProfile = await prisma.recruiterProfile.create({
     *   data: {
     *     // ... data to create a RecruiterProfile
     *   }
     * })
     * 
     */
    create<T extends RecruiterProfileCreateArgs>(args: SelectSubset<T, RecruiterProfileCreateArgs<ExtArgs>>): Prisma__RecruiterProfileClient<$Result.GetResult<Prisma.$RecruiterProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RecruiterProfiles.
     * @param {RecruiterProfileCreateManyArgs} args - Arguments to create many RecruiterProfiles.
     * @example
     * // Create many RecruiterProfiles
     * const recruiterProfile = await prisma.recruiterProfile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RecruiterProfileCreateManyArgs>(args?: SelectSubset<T, RecruiterProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RecruiterProfiles and returns the data saved in the database.
     * @param {RecruiterProfileCreateManyAndReturnArgs} args - Arguments to create many RecruiterProfiles.
     * @example
     * // Create many RecruiterProfiles
     * const recruiterProfile = await prisma.recruiterProfile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RecruiterProfiles and only return the `id`
     * const recruiterProfileWithIdOnly = await prisma.recruiterProfile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RecruiterProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, RecruiterProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecruiterProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RecruiterProfile.
     * @param {RecruiterProfileDeleteArgs} args - Arguments to delete one RecruiterProfile.
     * @example
     * // Delete one RecruiterProfile
     * const RecruiterProfile = await prisma.recruiterProfile.delete({
     *   where: {
     *     // ... filter to delete one RecruiterProfile
     *   }
     * })
     * 
     */
    delete<T extends RecruiterProfileDeleteArgs>(args: SelectSubset<T, RecruiterProfileDeleteArgs<ExtArgs>>): Prisma__RecruiterProfileClient<$Result.GetResult<Prisma.$RecruiterProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RecruiterProfile.
     * @param {RecruiterProfileUpdateArgs} args - Arguments to update one RecruiterProfile.
     * @example
     * // Update one RecruiterProfile
     * const recruiterProfile = await prisma.recruiterProfile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RecruiterProfileUpdateArgs>(args: SelectSubset<T, RecruiterProfileUpdateArgs<ExtArgs>>): Prisma__RecruiterProfileClient<$Result.GetResult<Prisma.$RecruiterProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RecruiterProfiles.
     * @param {RecruiterProfileDeleteManyArgs} args - Arguments to filter RecruiterProfiles to delete.
     * @example
     * // Delete a few RecruiterProfiles
     * const { count } = await prisma.recruiterProfile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RecruiterProfileDeleteManyArgs>(args?: SelectSubset<T, RecruiterProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RecruiterProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecruiterProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RecruiterProfiles
     * const recruiterProfile = await prisma.recruiterProfile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RecruiterProfileUpdateManyArgs>(args: SelectSubset<T, RecruiterProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RecruiterProfiles and returns the data updated in the database.
     * @param {RecruiterProfileUpdateManyAndReturnArgs} args - Arguments to update many RecruiterProfiles.
     * @example
     * // Update many RecruiterProfiles
     * const recruiterProfile = await prisma.recruiterProfile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RecruiterProfiles and only return the `id`
     * const recruiterProfileWithIdOnly = await prisma.recruiterProfile.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RecruiterProfileUpdateManyAndReturnArgs>(args: SelectSubset<T, RecruiterProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecruiterProfilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RecruiterProfile.
     * @param {RecruiterProfileUpsertArgs} args - Arguments to update or create a RecruiterProfile.
     * @example
     * // Update or create a RecruiterProfile
     * const recruiterProfile = await prisma.recruiterProfile.upsert({
     *   create: {
     *     // ... data to create a RecruiterProfile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RecruiterProfile we want to update
     *   }
     * })
     */
    upsert<T extends RecruiterProfileUpsertArgs>(args: SelectSubset<T, RecruiterProfileUpsertArgs<ExtArgs>>): Prisma__RecruiterProfileClient<$Result.GetResult<Prisma.$RecruiterProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RecruiterProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecruiterProfileCountArgs} args - Arguments to filter RecruiterProfiles to count.
     * @example
     * // Count the number of RecruiterProfiles
     * const count = await prisma.recruiterProfile.count({
     *   where: {
     *     // ... the filter for the RecruiterProfiles we want to count
     *   }
     * })
    **/
    count<T extends RecruiterProfileCountArgs>(
      args?: Subset<T, RecruiterProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RecruiterProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RecruiterProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecruiterProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RecruiterProfileAggregateArgs>(args: Subset<T, RecruiterProfileAggregateArgs>): Prisma.PrismaPromise<GetRecruiterProfileAggregateType<T>>

    /**
     * Group by RecruiterProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecruiterProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RecruiterProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RecruiterProfileGroupByArgs['orderBy'] }
        : { orderBy?: RecruiterProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RecruiterProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRecruiterProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RecruiterProfile model
   */
  readonly fields: RecruiterProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RecruiterProfile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RecruiterProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    recruiterVerificationMethods<T extends RecruiterProfile$recruiterVerificationMethodsArgs<ExtArgs> = {}>(args?: Subset<T, RecruiterProfile$recruiterVerificationMethodsArgs<ExtArgs>>): Prisma__RecruiterVerificationMethodsClient<$Result.GetResult<Prisma.$RecruiterVerificationMethodsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RecruiterProfile model
   */
  interface RecruiterProfileFieldRefs {
    readonly id: FieldRef<"RecruiterProfile", 'String'>
    readonly userId: FieldRef<"RecruiterProfile", 'String'>
    readonly fullName: FieldRef<"RecruiterProfile", 'String'>
    readonly companyId: FieldRef<"RecruiterProfile", 'String'>
    readonly jobRoleId: FieldRef<"RecruiterProfile", 'String'>
    readonly workEmail: FieldRef<"RecruiterProfile", 'String'>
    readonly location: FieldRef<"RecruiterProfile", 'String'>
    readonly isVerified: FieldRef<"RecruiterProfile", 'Boolean'>
    readonly recruiterVerificationMethodsId: FieldRef<"RecruiterProfile", 'String'>
    readonly verifiedBy: FieldRef<"RecruiterProfile", 'String'>
    readonly verificationDetails: FieldRef<"RecruiterProfile", 'String'>
    readonly createdAt: FieldRef<"RecruiterProfile", 'DateTime'>
    readonly updatedAt: FieldRef<"RecruiterProfile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RecruiterProfile findUnique
   */
  export type RecruiterProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecruiterProfile
     */
    select?: RecruiterProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecruiterProfile
     */
    omit?: RecruiterProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecruiterProfileInclude<ExtArgs> | null
    /**
     * Filter, which RecruiterProfile to fetch.
     */
    where: RecruiterProfileWhereUniqueInput
  }

  /**
   * RecruiterProfile findUniqueOrThrow
   */
  export type RecruiterProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecruiterProfile
     */
    select?: RecruiterProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecruiterProfile
     */
    omit?: RecruiterProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecruiterProfileInclude<ExtArgs> | null
    /**
     * Filter, which RecruiterProfile to fetch.
     */
    where: RecruiterProfileWhereUniqueInput
  }

  /**
   * RecruiterProfile findFirst
   */
  export type RecruiterProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecruiterProfile
     */
    select?: RecruiterProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecruiterProfile
     */
    omit?: RecruiterProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecruiterProfileInclude<ExtArgs> | null
    /**
     * Filter, which RecruiterProfile to fetch.
     */
    where?: RecruiterProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecruiterProfiles to fetch.
     */
    orderBy?: RecruiterProfileOrderByWithRelationInput | RecruiterProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RecruiterProfiles.
     */
    cursor?: RecruiterProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecruiterProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecruiterProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RecruiterProfiles.
     */
    distinct?: RecruiterProfileScalarFieldEnum | RecruiterProfileScalarFieldEnum[]
  }

  /**
   * RecruiterProfile findFirstOrThrow
   */
  export type RecruiterProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecruiterProfile
     */
    select?: RecruiterProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecruiterProfile
     */
    omit?: RecruiterProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecruiterProfileInclude<ExtArgs> | null
    /**
     * Filter, which RecruiterProfile to fetch.
     */
    where?: RecruiterProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecruiterProfiles to fetch.
     */
    orderBy?: RecruiterProfileOrderByWithRelationInput | RecruiterProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RecruiterProfiles.
     */
    cursor?: RecruiterProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecruiterProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecruiterProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RecruiterProfiles.
     */
    distinct?: RecruiterProfileScalarFieldEnum | RecruiterProfileScalarFieldEnum[]
  }

  /**
   * RecruiterProfile findMany
   */
  export type RecruiterProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecruiterProfile
     */
    select?: RecruiterProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecruiterProfile
     */
    omit?: RecruiterProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecruiterProfileInclude<ExtArgs> | null
    /**
     * Filter, which RecruiterProfiles to fetch.
     */
    where?: RecruiterProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecruiterProfiles to fetch.
     */
    orderBy?: RecruiterProfileOrderByWithRelationInput | RecruiterProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RecruiterProfiles.
     */
    cursor?: RecruiterProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecruiterProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecruiterProfiles.
     */
    skip?: number
    distinct?: RecruiterProfileScalarFieldEnum | RecruiterProfileScalarFieldEnum[]
  }

  /**
   * RecruiterProfile create
   */
  export type RecruiterProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecruiterProfile
     */
    select?: RecruiterProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecruiterProfile
     */
    omit?: RecruiterProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecruiterProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a RecruiterProfile.
     */
    data: XOR<RecruiterProfileCreateInput, RecruiterProfileUncheckedCreateInput>
  }

  /**
   * RecruiterProfile createMany
   */
  export type RecruiterProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RecruiterProfiles.
     */
    data: RecruiterProfileCreateManyInput | RecruiterProfileCreateManyInput[]
  }

  /**
   * RecruiterProfile createManyAndReturn
   */
  export type RecruiterProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecruiterProfile
     */
    select?: RecruiterProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RecruiterProfile
     */
    omit?: RecruiterProfileOmit<ExtArgs> | null
    /**
     * The data used to create many RecruiterProfiles.
     */
    data: RecruiterProfileCreateManyInput | RecruiterProfileCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecruiterProfileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RecruiterProfile update
   */
  export type RecruiterProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecruiterProfile
     */
    select?: RecruiterProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecruiterProfile
     */
    omit?: RecruiterProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecruiterProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a RecruiterProfile.
     */
    data: XOR<RecruiterProfileUpdateInput, RecruiterProfileUncheckedUpdateInput>
    /**
     * Choose, which RecruiterProfile to update.
     */
    where: RecruiterProfileWhereUniqueInput
  }

  /**
   * RecruiterProfile updateMany
   */
  export type RecruiterProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RecruiterProfiles.
     */
    data: XOR<RecruiterProfileUpdateManyMutationInput, RecruiterProfileUncheckedUpdateManyInput>
    /**
     * Filter which RecruiterProfiles to update
     */
    where?: RecruiterProfileWhereInput
    /**
     * Limit how many RecruiterProfiles to update.
     */
    limit?: number
  }

  /**
   * RecruiterProfile updateManyAndReturn
   */
  export type RecruiterProfileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecruiterProfile
     */
    select?: RecruiterProfileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RecruiterProfile
     */
    omit?: RecruiterProfileOmit<ExtArgs> | null
    /**
     * The data used to update RecruiterProfiles.
     */
    data: XOR<RecruiterProfileUpdateManyMutationInput, RecruiterProfileUncheckedUpdateManyInput>
    /**
     * Filter which RecruiterProfiles to update
     */
    where?: RecruiterProfileWhereInput
    /**
     * Limit how many RecruiterProfiles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecruiterProfileIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RecruiterProfile upsert
   */
  export type RecruiterProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecruiterProfile
     */
    select?: RecruiterProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecruiterProfile
     */
    omit?: RecruiterProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecruiterProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the RecruiterProfile to update in case it exists.
     */
    where: RecruiterProfileWhereUniqueInput
    /**
     * In case the RecruiterProfile found by the `where` argument doesn't exist, create a new RecruiterProfile with this data.
     */
    create: XOR<RecruiterProfileCreateInput, RecruiterProfileUncheckedCreateInput>
    /**
     * In case the RecruiterProfile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RecruiterProfileUpdateInput, RecruiterProfileUncheckedUpdateInput>
  }

  /**
   * RecruiterProfile delete
   */
  export type RecruiterProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecruiterProfile
     */
    select?: RecruiterProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecruiterProfile
     */
    omit?: RecruiterProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecruiterProfileInclude<ExtArgs> | null
    /**
     * Filter which RecruiterProfile to delete.
     */
    where: RecruiterProfileWhereUniqueInput
  }

  /**
   * RecruiterProfile deleteMany
   */
  export type RecruiterProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RecruiterProfiles to delete
     */
    where?: RecruiterProfileWhereInput
    /**
     * Limit how many RecruiterProfiles to delete.
     */
    limit?: number
  }

  /**
   * RecruiterProfile.recruiterVerificationMethods
   */
  export type RecruiterProfile$recruiterVerificationMethodsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecruiterVerificationMethods
     */
    select?: RecruiterVerificationMethodsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecruiterVerificationMethods
     */
    omit?: RecruiterVerificationMethodsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecruiterVerificationMethodsInclude<ExtArgs> | null
    where?: RecruiterVerificationMethodsWhereInput
  }

  /**
   * RecruiterProfile without action
   */
  export type RecruiterProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecruiterProfile
     */
    select?: RecruiterProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecruiterProfile
     */
    omit?: RecruiterProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecruiterProfileInclude<ExtArgs> | null
  }


  /**
   * Model RecruiterVerificationMethods
   */

  export type AggregateRecruiterVerificationMethods = {
    _count: RecruiterVerificationMethodsCountAggregateOutputType | null
    _min: RecruiterVerificationMethodsMinAggregateOutputType | null
    _max: RecruiterVerificationMethodsMaxAggregateOutputType | null
  }

  export type RecruiterVerificationMethodsMinAggregateOutputType = {
    id: string | null
    method: string | null
  }

  export type RecruiterVerificationMethodsMaxAggregateOutputType = {
    id: string | null
    method: string | null
  }

  export type RecruiterVerificationMethodsCountAggregateOutputType = {
    id: number
    method: number
    _all: number
  }


  export type RecruiterVerificationMethodsMinAggregateInputType = {
    id?: true
    method?: true
  }

  export type RecruiterVerificationMethodsMaxAggregateInputType = {
    id?: true
    method?: true
  }

  export type RecruiterVerificationMethodsCountAggregateInputType = {
    id?: true
    method?: true
    _all?: true
  }

  export type RecruiterVerificationMethodsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RecruiterVerificationMethods to aggregate.
     */
    where?: RecruiterVerificationMethodsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecruiterVerificationMethods to fetch.
     */
    orderBy?: RecruiterVerificationMethodsOrderByWithRelationInput | RecruiterVerificationMethodsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RecruiterVerificationMethodsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecruiterVerificationMethods from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecruiterVerificationMethods.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RecruiterVerificationMethods
    **/
    _count?: true | RecruiterVerificationMethodsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RecruiterVerificationMethodsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RecruiterVerificationMethodsMaxAggregateInputType
  }

  export type GetRecruiterVerificationMethodsAggregateType<T extends RecruiterVerificationMethodsAggregateArgs> = {
        [P in keyof T & keyof AggregateRecruiterVerificationMethods]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRecruiterVerificationMethods[P]>
      : GetScalarType<T[P], AggregateRecruiterVerificationMethods[P]>
  }




  export type RecruiterVerificationMethodsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RecruiterVerificationMethodsWhereInput
    orderBy?: RecruiterVerificationMethodsOrderByWithAggregationInput | RecruiterVerificationMethodsOrderByWithAggregationInput[]
    by: RecruiterVerificationMethodsScalarFieldEnum[] | RecruiterVerificationMethodsScalarFieldEnum
    having?: RecruiterVerificationMethodsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RecruiterVerificationMethodsCountAggregateInputType | true
    _min?: RecruiterVerificationMethodsMinAggregateInputType
    _max?: RecruiterVerificationMethodsMaxAggregateInputType
  }

  export type RecruiterVerificationMethodsGroupByOutputType = {
    id: string
    method: string
    _count: RecruiterVerificationMethodsCountAggregateOutputType | null
    _min: RecruiterVerificationMethodsMinAggregateOutputType | null
    _max: RecruiterVerificationMethodsMaxAggregateOutputType | null
  }

  type GetRecruiterVerificationMethodsGroupByPayload<T extends RecruiterVerificationMethodsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RecruiterVerificationMethodsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RecruiterVerificationMethodsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RecruiterVerificationMethodsGroupByOutputType[P]>
            : GetScalarType<T[P], RecruiterVerificationMethodsGroupByOutputType[P]>
        }
      >
    >


  export type RecruiterVerificationMethodsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    method?: boolean
    RecruiterProfile?: boolean | RecruiterVerificationMethods$RecruiterProfileArgs<ExtArgs>
    _count?: boolean | RecruiterVerificationMethodsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["recruiterVerificationMethods"]>

  export type RecruiterVerificationMethodsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    method?: boolean
  }, ExtArgs["result"]["recruiterVerificationMethods"]>

  export type RecruiterVerificationMethodsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    method?: boolean
  }, ExtArgs["result"]["recruiterVerificationMethods"]>

  export type RecruiterVerificationMethodsSelectScalar = {
    id?: boolean
    method?: boolean
  }

  export type RecruiterVerificationMethodsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "method", ExtArgs["result"]["recruiterVerificationMethods"]>
  export type RecruiterVerificationMethodsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    RecruiterProfile?: boolean | RecruiterVerificationMethods$RecruiterProfileArgs<ExtArgs>
    _count?: boolean | RecruiterVerificationMethodsCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RecruiterVerificationMethodsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type RecruiterVerificationMethodsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $RecruiterVerificationMethodsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RecruiterVerificationMethods"
    objects: {
      RecruiterProfile: Prisma.$RecruiterProfilePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      method: string
    }, ExtArgs["result"]["recruiterVerificationMethods"]>
    composites: {}
  }

  type RecruiterVerificationMethodsGetPayload<S extends boolean | null | undefined | RecruiterVerificationMethodsDefaultArgs> = $Result.GetResult<Prisma.$RecruiterVerificationMethodsPayload, S>

  type RecruiterVerificationMethodsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RecruiterVerificationMethodsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RecruiterVerificationMethodsCountAggregateInputType | true
    }

  export interface RecruiterVerificationMethodsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RecruiterVerificationMethods'], meta: { name: 'RecruiterVerificationMethods' } }
    /**
     * Find zero or one RecruiterVerificationMethods that matches the filter.
     * @param {RecruiterVerificationMethodsFindUniqueArgs} args - Arguments to find a RecruiterVerificationMethods
     * @example
     * // Get one RecruiterVerificationMethods
     * const recruiterVerificationMethods = await prisma.recruiterVerificationMethods.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RecruiterVerificationMethodsFindUniqueArgs>(args: SelectSubset<T, RecruiterVerificationMethodsFindUniqueArgs<ExtArgs>>): Prisma__RecruiterVerificationMethodsClient<$Result.GetResult<Prisma.$RecruiterVerificationMethodsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RecruiterVerificationMethods that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RecruiterVerificationMethodsFindUniqueOrThrowArgs} args - Arguments to find a RecruiterVerificationMethods
     * @example
     * // Get one RecruiterVerificationMethods
     * const recruiterVerificationMethods = await prisma.recruiterVerificationMethods.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RecruiterVerificationMethodsFindUniqueOrThrowArgs>(args: SelectSubset<T, RecruiterVerificationMethodsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RecruiterVerificationMethodsClient<$Result.GetResult<Prisma.$RecruiterVerificationMethodsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RecruiterVerificationMethods that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecruiterVerificationMethodsFindFirstArgs} args - Arguments to find a RecruiterVerificationMethods
     * @example
     * // Get one RecruiterVerificationMethods
     * const recruiterVerificationMethods = await prisma.recruiterVerificationMethods.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RecruiterVerificationMethodsFindFirstArgs>(args?: SelectSubset<T, RecruiterVerificationMethodsFindFirstArgs<ExtArgs>>): Prisma__RecruiterVerificationMethodsClient<$Result.GetResult<Prisma.$RecruiterVerificationMethodsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RecruiterVerificationMethods that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecruiterVerificationMethodsFindFirstOrThrowArgs} args - Arguments to find a RecruiterVerificationMethods
     * @example
     * // Get one RecruiterVerificationMethods
     * const recruiterVerificationMethods = await prisma.recruiterVerificationMethods.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RecruiterVerificationMethodsFindFirstOrThrowArgs>(args?: SelectSubset<T, RecruiterVerificationMethodsFindFirstOrThrowArgs<ExtArgs>>): Prisma__RecruiterVerificationMethodsClient<$Result.GetResult<Prisma.$RecruiterVerificationMethodsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RecruiterVerificationMethods that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecruiterVerificationMethodsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RecruiterVerificationMethods
     * const recruiterVerificationMethods = await prisma.recruiterVerificationMethods.findMany()
     * 
     * // Get first 10 RecruiterVerificationMethods
     * const recruiterVerificationMethods = await prisma.recruiterVerificationMethods.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const recruiterVerificationMethodsWithIdOnly = await prisma.recruiterVerificationMethods.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RecruiterVerificationMethodsFindManyArgs>(args?: SelectSubset<T, RecruiterVerificationMethodsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecruiterVerificationMethodsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RecruiterVerificationMethods.
     * @param {RecruiterVerificationMethodsCreateArgs} args - Arguments to create a RecruiterVerificationMethods.
     * @example
     * // Create one RecruiterVerificationMethods
     * const RecruiterVerificationMethods = await prisma.recruiterVerificationMethods.create({
     *   data: {
     *     // ... data to create a RecruiterVerificationMethods
     *   }
     * })
     * 
     */
    create<T extends RecruiterVerificationMethodsCreateArgs>(args: SelectSubset<T, RecruiterVerificationMethodsCreateArgs<ExtArgs>>): Prisma__RecruiterVerificationMethodsClient<$Result.GetResult<Prisma.$RecruiterVerificationMethodsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RecruiterVerificationMethods.
     * @param {RecruiterVerificationMethodsCreateManyArgs} args - Arguments to create many RecruiterVerificationMethods.
     * @example
     * // Create many RecruiterVerificationMethods
     * const recruiterVerificationMethods = await prisma.recruiterVerificationMethods.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RecruiterVerificationMethodsCreateManyArgs>(args?: SelectSubset<T, RecruiterVerificationMethodsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RecruiterVerificationMethods and returns the data saved in the database.
     * @param {RecruiterVerificationMethodsCreateManyAndReturnArgs} args - Arguments to create many RecruiterVerificationMethods.
     * @example
     * // Create many RecruiterVerificationMethods
     * const recruiterVerificationMethods = await prisma.recruiterVerificationMethods.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RecruiterVerificationMethods and only return the `id`
     * const recruiterVerificationMethodsWithIdOnly = await prisma.recruiterVerificationMethods.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RecruiterVerificationMethodsCreateManyAndReturnArgs>(args?: SelectSubset<T, RecruiterVerificationMethodsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecruiterVerificationMethodsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RecruiterVerificationMethods.
     * @param {RecruiterVerificationMethodsDeleteArgs} args - Arguments to delete one RecruiterVerificationMethods.
     * @example
     * // Delete one RecruiterVerificationMethods
     * const RecruiterVerificationMethods = await prisma.recruiterVerificationMethods.delete({
     *   where: {
     *     // ... filter to delete one RecruiterVerificationMethods
     *   }
     * })
     * 
     */
    delete<T extends RecruiterVerificationMethodsDeleteArgs>(args: SelectSubset<T, RecruiterVerificationMethodsDeleteArgs<ExtArgs>>): Prisma__RecruiterVerificationMethodsClient<$Result.GetResult<Prisma.$RecruiterVerificationMethodsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RecruiterVerificationMethods.
     * @param {RecruiterVerificationMethodsUpdateArgs} args - Arguments to update one RecruiterVerificationMethods.
     * @example
     * // Update one RecruiterVerificationMethods
     * const recruiterVerificationMethods = await prisma.recruiterVerificationMethods.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RecruiterVerificationMethodsUpdateArgs>(args: SelectSubset<T, RecruiterVerificationMethodsUpdateArgs<ExtArgs>>): Prisma__RecruiterVerificationMethodsClient<$Result.GetResult<Prisma.$RecruiterVerificationMethodsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RecruiterVerificationMethods.
     * @param {RecruiterVerificationMethodsDeleteManyArgs} args - Arguments to filter RecruiterVerificationMethods to delete.
     * @example
     * // Delete a few RecruiterVerificationMethods
     * const { count } = await prisma.recruiterVerificationMethods.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RecruiterVerificationMethodsDeleteManyArgs>(args?: SelectSubset<T, RecruiterVerificationMethodsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RecruiterVerificationMethods.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecruiterVerificationMethodsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RecruiterVerificationMethods
     * const recruiterVerificationMethods = await prisma.recruiterVerificationMethods.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RecruiterVerificationMethodsUpdateManyArgs>(args: SelectSubset<T, RecruiterVerificationMethodsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RecruiterVerificationMethods and returns the data updated in the database.
     * @param {RecruiterVerificationMethodsUpdateManyAndReturnArgs} args - Arguments to update many RecruiterVerificationMethods.
     * @example
     * // Update many RecruiterVerificationMethods
     * const recruiterVerificationMethods = await prisma.recruiterVerificationMethods.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RecruiterVerificationMethods and only return the `id`
     * const recruiterVerificationMethodsWithIdOnly = await prisma.recruiterVerificationMethods.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RecruiterVerificationMethodsUpdateManyAndReturnArgs>(args: SelectSubset<T, RecruiterVerificationMethodsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecruiterVerificationMethodsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RecruiterVerificationMethods.
     * @param {RecruiterVerificationMethodsUpsertArgs} args - Arguments to update or create a RecruiterVerificationMethods.
     * @example
     * // Update or create a RecruiterVerificationMethods
     * const recruiterVerificationMethods = await prisma.recruiterVerificationMethods.upsert({
     *   create: {
     *     // ... data to create a RecruiterVerificationMethods
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RecruiterVerificationMethods we want to update
     *   }
     * })
     */
    upsert<T extends RecruiterVerificationMethodsUpsertArgs>(args: SelectSubset<T, RecruiterVerificationMethodsUpsertArgs<ExtArgs>>): Prisma__RecruiterVerificationMethodsClient<$Result.GetResult<Prisma.$RecruiterVerificationMethodsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RecruiterVerificationMethods.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecruiterVerificationMethodsCountArgs} args - Arguments to filter RecruiterVerificationMethods to count.
     * @example
     * // Count the number of RecruiterVerificationMethods
     * const count = await prisma.recruiterVerificationMethods.count({
     *   where: {
     *     // ... the filter for the RecruiterVerificationMethods we want to count
     *   }
     * })
    **/
    count<T extends RecruiterVerificationMethodsCountArgs>(
      args?: Subset<T, RecruiterVerificationMethodsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RecruiterVerificationMethodsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RecruiterVerificationMethods.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecruiterVerificationMethodsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RecruiterVerificationMethodsAggregateArgs>(args: Subset<T, RecruiterVerificationMethodsAggregateArgs>): Prisma.PrismaPromise<GetRecruiterVerificationMethodsAggregateType<T>>

    /**
     * Group by RecruiterVerificationMethods.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecruiterVerificationMethodsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RecruiterVerificationMethodsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RecruiterVerificationMethodsGroupByArgs['orderBy'] }
        : { orderBy?: RecruiterVerificationMethodsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RecruiterVerificationMethodsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRecruiterVerificationMethodsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RecruiterVerificationMethods model
   */
  readonly fields: RecruiterVerificationMethodsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RecruiterVerificationMethods.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RecruiterVerificationMethodsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    RecruiterProfile<T extends RecruiterVerificationMethods$RecruiterProfileArgs<ExtArgs> = {}>(args?: Subset<T, RecruiterVerificationMethods$RecruiterProfileArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecruiterProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RecruiterVerificationMethods model
   */
  interface RecruiterVerificationMethodsFieldRefs {
    readonly id: FieldRef<"RecruiterVerificationMethods", 'String'>
    readonly method: FieldRef<"RecruiterVerificationMethods", 'String'>
  }
    

  // Custom InputTypes
  /**
   * RecruiterVerificationMethods findUnique
   */
  export type RecruiterVerificationMethodsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecruiterVerificationMethods
     */
    select?: RecruiterVerificationMethodsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecruiterVerificationMethods
     */
    omit?: RecruiterVerificationMethodsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecruiterVerificationMethodsInclude<ExtArgs> | null
    /**
     * Filter, which RecruiterVerificationMethods to fetch.
     */
    where: RecruiterVerificationMethodsWhereUniqueInput
  }

  /**
   * RecruiterVerificationMethods findUniqueOrThrow
   */
  export type RecruiterVerificationMethodsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecruiterVerificationMethods
     */
    select?: RecruiterVerificationMethodsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecruiterVerificationMethods
     */
    omit?: RecruiterVerificationMethodsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecruiterVerificationMethodsInclude<ExtArgs> | null
    /**
     * Filter, which RecruiterVerificationMethods to fetch.
     */
    where: RecruiterVerificationMethodsWhereUniqueInput
  }

  /**
   * RecruiterVerificationMethods findFirst
   */
  export type RecruiterVerificationMethodsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecruiterVerificationMethods
     */
    select?: RecruiterVerificationMethodsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecruiterVerificationMethods
     */
    omit?: RecruiterVerificationMethodsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecruiterVerificationMethodsInclude<ExtArgs> | null
    /**
     * Filter, which RecruiterVerificationMethods to fetch.
     */
    where?: RecruiterVerificationMethodsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecruiterVerificationMethods to fetch.
     */
    orderBy?: RecruiterVerificationMethodsOrderByWithRelationInput | RecruiterVerificationMethodsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RecruiterVerificationMethods.
     */
    cursor?: RecruiterVerificationMethodsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecruiterVerificationMethods from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecruiterVerificationMethods.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RecruiterVerificationMethods.
     */
    distinct?: RecruiterVerificationMethodsScalarFieldEnum | RecruiterVerificationMethodsScalarFieldEnum[]
  }

  /**
   * RecruiterVerificationMethods findFirstOrThrow
   */
  export type RecruiterVerificationMethodsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecruiterVerificationMethods
     */
    select?: RecruiterVerificationMethodsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecruiterVerificationMethods
     */
    omit?: RecruiterVerificationMethodsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecruiterVerificationMethodsInclude<ExtArgs> | null
    /**
     * Filter, which RecruiterVerificationMethods to fetch.
     */
    where?: RecruiterVerificationMethodsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecruiterVerificationMethods to fetch.
     */
    orderBy?: RecruiterVerificationMethodsOrderByWithRelationInput | RecruiterVerificationMethodsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RecruiterVerificationMethods.
     */
    cursor?: RecruiterVerificationMethodsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecruiterVerificationMethods from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecruiterVerificationMethods.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RecruiterVerificationMethods.
     */
    distinct?: RecruiterVerificationMethodsScalarFieldEnum | RecruiterVerificationMethodsScalarFieldEnum[]
  }

  /**
   * RecruiterVerificationMethods findMany
   */
  export type RecruiterVerificationMethodsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecruiterVerificationMethods
     */
    select?: RecruiterVerificationMethodsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecruiterVerificationMethods
     */
    omit?: RecruiterVerificationMethodsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecruiterVerificationMethodsInclude<ExtArgs> | null
    /**
     * Filter, which RecruiterVerificationMethods to fetch.
     */
    where?: RecruiterVerificationMethodsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecruiterVerificationMethods to fetch.
     */
    orderBy?: RecruiterVerificationMethodsOrderByWithRelationInput | RecruiterVerificationMethodsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RecruiterVerificationMethods.
     */
    cursor?: RecruiterVerificationMethodsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecruiterVerificationMethods from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecruiterVerificationMethods.
     */
    skip?: number
    distinct?: RecruiterVerificationMethodsScalarFieldEnum | RecruiterVerificationMethodsScalarFieldEnum[]
  }

  /**
   * RecruiterVerificationMethods create
   */
  export type RecruiterVerificationMethodsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecruiterVerificationMethods
     */
    select?: RecruiterVerificationMethodsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecruiterVerificationMethods
     */
    omit?: RecruiterVerificationMethodsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecruiterVerificationMethodsInclude<ExtArgs> | null
    /**
     * The data needed to create a RecruiterVerificationMethods.
     */
    data: XOR<RecruiterVerificationMethodsCreateInput, RecruiterVerificationMethodsUncheckedCreateInput>
  }

  /**
   * RecruiterVerificationMethods createMany
   */
  export type RecruiterVerificationMethodsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RecruiterVerificationMethods.
     */
    data: RecruiterVerificationMethodsCreateManyInput | RecruiterVerificationMethodsCreateManyInput[]
  }

  /**
   * RecruiterVerificationMethods createManyAndReturn
   */
  export type RecruiterVerificationMethodsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecruiterVerificationMethods
     */
    select?: RecruiterVerificationMethodsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RecruiterVerificationMethods
     */
    omit?: RecruiterVerificationMethodsOmit<ExtArgs> | null
    /**
     * The data used to create many RecruiterVerificationMethods.
     */
    data: RecruiterVerificationMethodsCreateManyInput | RecruiterVerificationMethodsCreateManyInput[]
  }

  /**
   * RecruiterVerificationMethods update
   */
  export type RecruiterVerificationMethodsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecruiterVerificationMethods
     */
    select?: RecruiterVerificationMethodsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecruiterVerificationMethods
     */
    omit?: RecruiterVerificationMethodsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecruiterVerificationMethodsInclude<ExtArgs> | null
    /**
     * The data needed to update a RecruiterVerificationMethods.
     */
    data: XOR<RecruiterVerificationMethodsUpdateInput, RecruiterVerificationMethodsUncheckedUpdateInput>
    /**
     * Choose, which RecruiterVerificationMethods to update.
     */
    where: RecruiterVerificationMethodsWhereUniqueInput
  }

  /**
   * RecruiterVerificationMethods updateMany
   */
  export type RecruiterVerificationMethodsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RecruiterVerificationMethods.
     */
    data: XOR<RecruiterVerificationMethodsUpdateManyMutationInput, RecruiterVerificationMethodsUncheckedUpdateManyInput>
    /**
     * Filter which RecruiterVerificationMethods to update
     */
    where?: RecruiterVerificationMethodsWhereInput
    /**
     * Limit how many RecruiterVerificationMethods to update.
     */
    limit?: number
  }

  /**
   * RecruiterVerificationMethods updateManyAndReturn
   */
  export type RecruiterVerificationMethodsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecruiterVerificationMethods
     */
    select?: RecruiterVerificationMethodsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RecruiterVerificationMethods
     */
    omit?: RecruiterVerificationMethodsOmit<ExtArgs> | null
    /**
     * The data used to update RecruiterVerificationMethods.
     */
    data: XOR<RecruiterVerificationMethodsUpdateManyMutationInput, RecruiterVerificationMethodsUncheckedUpdateManyInput>
    /**
     * Filter which RecruiterVerificationMethods to update
     */
    where?: RecruiterVerificationMethodsWhereInput
    /**
     * Limit how many RecruiterVerificationMethods to update.
     */
    limit?: number
  }

  /**
   * RecruiterVerificationMethods upsert
   */
  export type RecruiterVerificationMethodsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecruiterVerificationMethods
     */
    select?: RecruiterVerificationMethodsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecruiterVerificationMethods
     */
    omit?: RecruiterVerificationMethodsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecruiterVerificationMethodsInclude<ExtArgs> | null
    /**
     * The filter to search for the RecruiterVerificationMethods to update in case it exists.
     */
    where: RecruiterVerificationMethodsWhereUniqueInput
    /**
     * In case the RecruiterVerificationMethods found by the `where` argument doesn't exist, create a new RecruiterVerificationMethods with this data.
     */
    create: XOR<RecruiterVerificationMethodsCreateInput, RecruiterVerificationMethodsUncheckedCreateInput>
    /**
     * In case the RecruiterVerificationMethods was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RecruiterVerificationMethodsUpdateInput, RecruiterVerificationMethodsUncheckedUpdateInput>
  }

  /**
   * RecruiterVerificationMethods delete
   */
  export type RecruiterVerificationMethodsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecruiterVerificationMethods
     */
    select?: RecruiterVerificationMethodsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecruiterVerificationMethods
     */
    omit?: RecruiterVerificationMethodsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecruiterVerificationMethodsInclude<ExtArgs> | null
    /**
     * Filter which RecruiterVerificationMethods to delete.
     */
    where: RecruiterVerificationMethodsWhereUniqueInput
  }

  /**
   * RecruiterVerificationMethods deleteMany
   */
  export type RecruiterVerificationMethodsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RecruiterVerificationMethods to delete
     */
    where?: RecruiterVerificationMethodsWhereInput
    /**
     * Limit how many RecruiterVerificationMethods to delete.
     */
    limit?: number
  }

  /**
   * RecruiterVerificationMethods.RecruiterProfile
   */
  export type RecruiterVerificationMethods$RecruiterProfileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecruiterProfile
     */
    select?: RecruiterProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecruiterProfile
     */
    omit?: RecruiterProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecruiterProfileInclude<ExtArgs> | null
    where?: RecruiterProfileWhereInput
    orderBy?: RecruiterProfileOrderByWithRelationInput | RecruiterProfileOrderByWithRelationInput[]
    cursor?: RecruiterProfileWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RecruiterProfileScalarFieldEnum | RecruiterProfileScalarFieldEnum[]
  }

  /**
   * RecruiterVerificationMethods without action
   */
  export type RecruiterVerificationMethodsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecruiterVerificationMethods
     */
    select?: RecruiterVerificationMethodsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecruiterVerificationMethods
     */
    omit?: RecruiterVerificationMethodsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecruiterVerificationMethodsInclude<ExtArgs> | null
  }


  /**
   * Model SavedJob
   */

  export type AggregateSavedJob = {
    _count: SavedJobCountAggregateOutputType | null
    _min: SavedJobMinAggregateOutputType | null
    _max: SavedJobMaxAggregateOutputType | null
  }

  export type SavedJobMinAggregateOutputType = {
    id: string | null
    userId: string | null
    jobId: string | null
    createdAt: Date | null
  }

  export type SavedJobMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    jobId: string | null
    createdAt: Date | null
  }

  export type SavedJobCountAggregateOutputType = {
    id: number
    userId: number
    jobId: number
    createdAt: number
    _all: number
  }


  export type SavedJobMinAggregateInputType = {
    id?: true
    userId?: true
    jobId?: true
    createdAt?: true
  }

  export type SavedJobMaxAggregateInputType = {
    id?: true
    userId?: true
    jobId?: true
    createdAt?: true
  }

  export type SavedJobCountAggregateInputType = {
    id?: true
    userId?: true
    jobId?: true
    createdAt?: true
    _all?: true
  }

  export type SavedJobAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SavedJob to aggregate.
     */
    where?: SavedJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SavedJobs to fetch.
     */
    orderBy?: SavedJobOrderByWithRelationInput | SavedJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SavedJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SavedJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SavedJobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SavedJobs
    **/
    _count?: true | SavedJobCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SavedJobMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SavedJobMaxAggregateInputType
  }

  export type GetSavedJobAggregateType<T extends SavedJobAggregateArgs> = {
        [P in keyof T & keyof AggregateSavedJob]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSavedJob[P]>
      : GetScalarType<T[P], AggregateSavedJob[P]>
  }




  export type SavedJobGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SavedJobWhereInput
    orderBy?: SavedJobOrderByWithAggregationInput | SavedJobOrderByWithAggregationInput[]
    by: SavedJobScalarFieldEnum[] | SavedJobScalarFieldEnum
    having?: SavedJobScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SavedJobCountAggregateInputType | true
    _min?: SavedJobMinAggregateInputType
    _max?: SavedJobMaxAggregateInputType
  }

  export type SavedJobGroupByOutputType = {
    id: string
    userId: string
    jobId: string
    createdAt: Date
    _count: SavedJobCountAggregateOutputType | null
    _min: SavedJobMinAggregateOutputType | null
    _max: SavedJobMaxAggregateOutputType | null
  }

  type GetSavedJobGroupByPayload<T extends SavedJobGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SavedJobGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SavedJobGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SavedJobGroupByOutputType[P]>
            : GetScalarType<T[P], SavedJobGroupByOutputType[P]>
        }
      >
    >


  export type SavedJobSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    jobId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["savedJob"]>

  export type SavedJobSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    jobId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["savedJob"]>

  export type SavedJobSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    jobId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["savedJob"]>

  export type SavedJobSelectScalar = {
    id?: boolean
    userId?: boolean
    jobId?: boolean
    createdAt?: boolean
  }

  export type SavedJobOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "jobId" | "createdAt", ExtArgs["result"]["savedJob"]>
  export type SavedJobInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SavedJobIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SavedJobIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SavedJobPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SavedJob"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      jobId: string
      createdAt: Date
    }, ExtArgs["result"]["savedJob"]>
    composites: {}
  }

  type SavedJobGetPayload<S extends boolean | null | undefined | SavedJobDefaultArgs> = $Result.GetResult<Prisma.$SavedJobPayload, S>

  type SavedJobCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SavedJobFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SavedJobCountAggregateInputType | true
    }

  export interface SavedJobDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SavedJob'], meta: { name: 'SavedJob' } }
    /**
     * Find zero or one SavedJob that matches the filter.
     * @param {SavedJobFindUniqueArgs} args - Arguments to find a SavedJob
     * @example
     * // Get one SavedJob
     * const savedJob = await prisma.savedJob.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SavedJobFindUniqueArgs>(args: SelectSubset<T, SavedJobFindUniqueArgs<ExtArgs>>): Prisma__SavedJobClient<$Result.GetResult<Prisma.$SavedJobPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SavedJob that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SavedJobFindUniqueOrThrowArgs} args - Arguments to find a SavedJob
     * @example
     * // Get one SavedJob
     * const savedJob = await prisma.savedJob.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SavedJobFindUniqueOrThrowArgs>(args: SelectSubset<T, SavedJobFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SavedJobClient<$Result.GetResult<Prisma.$SavedJobPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SavedJob that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedJobFindFirstArgs} args - Arguments to find a SavedJob
     * @example
     * // Get one SavedJob
     * const savedJob = await prisma.savedJob.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SavedJobFindFirstArgs>(args?: SelectSubset<T, SavedJobFindFirstArgs<ExtArgs>>): Prisma__SavedJobClient<$Result.GetResult<Prisma.$SavedJobPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SavedJob that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedJobFindFirstOrThrowArgs} args - Arguments to find a SavedJob
     * @example
     * // Get one SavedJob
     * const savedJob = await prisma.savedJob.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SavedJobFindFirstOrThrowArgs>(args?: SelectSubset<T, SavedJobFindFirstOrThrowArgs<ExtArgs>>): Prisma__SavedJobClient<$Result.GetResult<Prisma.$SavedJobPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SavedJobs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedJobFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SavedJobs
     * const savedJobs = await prisma.savedJob.findMany()
     * 
     * // Get first 10 SavedJobs
     * const savedJobs = await prisma.savedJob.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const savedJobWithIdOnly = await prisma.savedJob.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SavedJobFindManyArgs>(args?: SelectSubset<T, SavedJobFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SavedJobPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SavedJob.
     * @param {SavedJobCreateArgs} args - Arguments to create a SavedJob.
     * @example
     * // Create one SavedJob
     * const SavedJob = await prisma.savedJob.create({
     *   data: {
     *     // ... data to create a SavedJob
     *   }
     * })
     * 
     */
    create<T extends SavedJobCreateArgs>(args: SelectSubset<T, SavedJobCreateArgs<ExtArgs>>): Prisma__SavedJobClient<$Result.GetResult<Prisma.$SavedJobPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SavedJobs.
     * @param {SavedJobCreateManyArgs} args - Arguments to create many SavedJobs.
     * @example
     * // Create many SavedJobs
     * const savedJob = await prisma.savedJob.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SavedJobCreateManyArgs>(args?: SelectSubset<T, SavedJobCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SavedJobs and returns the data saved in the database.
     * @param {SavedJobCreateManyAndReturnArgs} args - Arguments to create many SavedJobs.
     * @example
     * // Create many SavedJobs
     * const savedJob = await prisma.savedJob.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SavedJobs and only return the `id`
     * const savedJobWithIdOnly = await prisma.savedJob.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SavedJobCreateManyAndReturnArgs>(args?: SelectSubset<T, SavedJobCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SavedJobPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SavedJob.
     * @param {SavedJobDeleteArgs} args - Arguments to delete one SavedJob.
     * @example
     * // Delete one SavedJob
     * const SavedJob = await prisma.savedJob.delete({
     *   where: {
     *     // ... filter to delete one SavedJob
     *   }
     * })
     * 
     */
    delete<T extends SavedJobDeleteArgs>(args: SelectSubset<T, SavedJobDeleteArgs<ExtArgs>>): Prisma__SavedJobClient<$Result.GetResult<Prisma.$SavedJobPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SavedJob.
     * @param {SavedJobUpdateArgs} args - Arguments to update one SavedJob.
     * @example
     * // Update one SavedJob
     * const savedJob = await prisma.savedJob.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SavedJobUpdateArgs>(args: SelectSubset<T, SavedJobUpdateArgs<ExtArgs>>): Prisma__SavedJobClient<$Result.GetResult<Prisma.$SavedJobPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SavedJobs.
     * @param {SavedJobDeleteManyArgs} args - Arguments to filter SavedJobs to delete.
     * @example
     * // Delete a few SavedJobs
     * const { count } = await prisma.savedJob.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SavedJobDeleteManyArgs>(args?: SelectSubset<T, SavedJobDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SavedJobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedJobUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SavedJobs
     * const savedJob = await prisma.savedJob.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SavedJobUpdateManyArgs>(args: SelectSubset<T, SavedJobUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SavedJobs and returns the data updated in the database.
     * @param {SavedJobUpdateManyAndReturnArgs} args - Arguments to update many SavedJobs.
     * @example
     * // Update many SavedJobs
     * const savedJob = await prisma.savedJob.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SavedJobs and only return the `id`
     * const savedJobWithIdOnly = await prisma.savedJob.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SavedJobUpdateManyAndReturnArgs>(args: SelectSubset<T, SavedJobUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SavedJobPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SavedJob.
     * @param {SavedJobUpsertArgs} args - Arguments to update or create a SavedJob.
     * @example
     * // Update or create a SavedJob
     * const savedJob = await prisma.savedJob.upsert({
     *   create: {
     *     // ... data to create a SavedJob
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SavedJob we want to update
     *   }
     * })
     */
    upsert<T extends SavedJobUpsertArgs>(args: SelectSubset<T, SavedJobUpsertArgs<ExtArgs>>): Prisma__SavedJobClient<$Result.GetResult<Prisma.$SavedJobPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SavedJobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedJobCountArgs} args - Arguments to filter SavedJobs to count.
     * @example
     * // Count the number of SavedJobs
     * const count = await prisma.savedJob.count({
     *   where: {
     *     // ... the filter for the SavedJobs we want to count
     *   }
     * })
    **/
    count<T extends SavedJobCountArgs>(
      args?: Subset<T, SavedJobCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SavedJobCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SavedJob.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedJobAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SavedJobAggregateArgs>(args: Subset<T, SavedJobAggregateArgs>): Prisma.PrismaPromise<GetSavedJobAggregateType<T>>

    /**
     * Group by SavedJob.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedJobGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SavedJobGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SavedJobGroupByArgs['orderBy'] }
        : { orderBy?: SavedJobGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SavedJobGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSavedJobGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SavedJob model
   */
  readonly fields: SavedJobFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SavedJob.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SavedJobClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SavedJob model
   */
  interface SavedJobFieldRefs {
    readonly id: FieldRef<"SavedJob", 'String'>
    readonly userId: FieldRef<"SavedJob", 'String'>
    readonly jobId: FieldRef<"SavedJob", 'String'>
    readonly createdAt: FieldRef<"SavedJob", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SavedJob findUnique
   */
  export type SavedJobFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedJob
     */
    select?: SavedJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedJob
     */
    omit?: SavedJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedJobInclude<ExtArgs> | null
    /**
     * Filter, which SavedJob to fetch.
     */
    where: SavedJobWhereUniqueInput
  }

  /**
   * SavedJob findUniqueOrThrow
   */
  export type SavedJobFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedJob
     */
    select?: SavedJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedJob
     */
    omit?: SavedJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedJobInclude<ExtArgs> | null
    /**
     * Filter, which SavedJob to fetch.
     */
    where: SavedJobWhereUniqueInput
  }

  /**
   * SavedJob findFirst
   */
  export type SavedJobFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedJob
     */
    select?: SavedJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedJob
     */
    omit?: SavedJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedJobInclude<ExtArgs> | null
    /**
     * Filter, which SavedJob to fetch.
     */
    where?: SavedJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SavedJobs to fetch.
     */
    orderBy?: SavedJobOrderByWithRelationInput | SavedJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SavedJobs.
     */
    cursor?: SavedJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SavedJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SavedJobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SavedJobs.
     */
    distinct?: SavedJobScalarFieldEnum | SavedJobScalarFieldEnum[]
  }

  /**
   * SavedJob findFirstOrThrow
   */
  export type SavedJobFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedJob
     */
    select?: SavedJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedJob
     */
    omit?: SavedJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedJobInclude<ExtArgs> | null
    /**
     * Filter, which SavedJob to fetch.
     */
    where?: SavedJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SavedJobs to fetch.
     */
    orderBy?: SavedJobOrderByWithRelationInput | SavedJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SavedJobs.
     */
    cursor?: SavedJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SavedJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SavedJobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SavedJobs.
     */
    distinct?: SavedJobScalarFieldEnum | SavedJobScalarFieldEnum[]
  }

  /**
   * SavedJob findMany
   */
  export type SavedJobFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedJob
     */
    select?: SavedJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedJob
     */
    omit?: SavedJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedJobInclude<ExtArgs> | null
    /**
     * Filter, which SavedJobs to fetch.
     */
    where?: SavedJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SavedJobs to fetch.
     */
    orderBy?: SavedJobOrderByWithRelationInput | SavedJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SavedJobs.
     */
    cursor?: SavedJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SavedJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SavedJobs.
     */
    skip?: number
    distinct?: SavedJobScalarFieldEnum | SavedJobScalarFieldEnum[]
  }

  /**
   * SavedJob create
   */
  export type SavedJobCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedJob
     */
    select?: SavedJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedJob
     */
    omit?: SavedJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedJobInclude<ExtArgs> | null
    /**
     * The data needed to create a SavedJob.
     */
    data: XOR<SavedJobCreateInput, SavedJobUncheckedCreateInput>
  }

  /**
   * SavedJob createMany
   */
  export type SavedJobCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SavedJobs.
     */
    data: SavedJobCreateManyInput | SavedJobCreateManyInput[]
  }

  /**
   * SavedJob createManyAndReturn
   */
  export type SavedJobCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedJob
     */
    select?: SavedJobSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SavedJob
     */
    omit?: SavedJobOmit<ExtArgs> | null
    /**
     * The data used to create many SavedJobs.
     */
    data: SavedJobCreateManyInput | SavedJobCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedJobIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SavedJob update
   */
  export type SavedJobUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedJob
     */
    select?: SavedJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedJob
     */
    omit?: SavedJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedJobInclude<ExtArgs> | null
    /**
     * The data needed to update a SavedJob.
     */
    data: XOR<SavedJobUpdateInput, SavedJobUncheckedUpdateInput>
    /**
     * Choose, which SavedJob to update.
     */
    where: SavedJobWhereUniqueInput
  }

  /**
   * SavedJob updateMany
   */
  export type SavedJobUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SavedJobs.
     */
    data: XOR<SavedJobUpdateManyMutationInput, SavedJobUncheckedUpdateManyInput>
    /**
     * Filter which SavedJobs to update
     */
    where?: SavedJobWhereInput
    /**
     * Limit how many SavedJobs to update.
     */
    limit?: number
  }

  /**
   * SavedJob updateManyAndReturn
   */
  export type SavedJobUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedJob
     */
    select?: SavedJobSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SavedJob
     */
    omit?: SavedJobOmit<ExtArgs> | null
    /**
     * The data used to update SavedJobs.
     */
    data: XOR<SavedJobUpdateManyMutationInput, SavedJobUncheckedUpdateManyInput>
    /**
     * Filter which SavedJobs to update
     */
    where?: SavedJobWhereInput
    /**
     * Limit how many SavedJobs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedJobIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SavedJob upsert
   */
  export type SavedJobUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedJob
     */
    select?: SavedJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedJob
     */
    omit?: SavedJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedJobInclude<ExtArgs> | null
    /**
     * The filter to search for the SavedJob to update in case it exists.
     */
    where: SavedJobWhereUniqueInput
    /**
     * In case the SavedJob found by the `where` argument doesn't exist, create a new SavedJob with this data.
     */
    create: XOR<SavedJobCreateInput, SavedJobUncheckedCreateInput>
    /**
     * In case the SavedJob was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SavedJobUpdateInput, SavedJobUncheckedUpdateInput>
  }

  /**
   * SavedJob delete
   */
  export type SavedJobDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedJob
     */
    select?: SavedJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedJob
     */
    omit?: SavedJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedJobInclude<ExtArgs> | null
    /**
     * Filter which SavedJob to delete.
     */
    where: SavedJobWhereUniqueInput
  }

  /**
   * SavedJob deleteMany
   */
  export type SavedJobDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SavedJobs to delete
     */
    where?: SavedJobWhereInput
    /**
     * Limit how many SavedJobs to delete.
     */
    limit?: number
  }

  /**
   * SavedJob without action
   */
  export type SavedJobDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedJob
     */
    select?: SavedJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedJob
     */
    omit?: SavedJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedJobInclude<ExtArgs> | null
  }


  /**
   * Model SkillUserMap
   */

  export type AggregateSkillUserMap = {
    _count: SkillUserMapCountAggregateOutputType | null
    _min: SkillUserMapMinAggregateOutputType | null
    _max: SkillUserMapMaxAggregateOutputType | null
  }

  export type SkillUserMapMinAggregateOutputType = {
    id: string | null
    skillId: string | null
    profileId: string | null
    createdAt: Date | null
  }

  export type SkillUserMapMaxAggregateOutputType = {
    id: string | null
    skillId: string | null
    profileId: string | null
    createdAt: Date | null
  }

  export type SkillUserMapCountAggregateOutputType = {
    id: number
    skillId: number
    profileId: number
    createdAt: number
    _all: number
  }


  export type SkillUserMapMinAggregateInputType = {
    id?: true
    skillId?: true
    profileId?: true
    createdAt?: true
  }

  export type SkillUserMapMaxAggregateInputType = {
    id?: true
    skillId?: true
    profileId?: true
    createdAt?: true
  }

  export type SkillUserMapCountAggregateInputType = {
    id?: true
    skillId?: true
    profileId?: true
    createdAt?: true
    _all?: true
  }

  export type SkillUserMapAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SkillUserMap to aggregate.
     */
    where?: SkillUserMapWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SkillUserMaps to fetch.
     */
    orderBy?: SkillUserMapOrderByWithRelationInput | SkillUserMapOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SkillUserMapWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SkillUserMaps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SkillUserMaps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SkillUserMaps
    **/
    _count?: true | SkillUserMapCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SkillUserMapMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SkillUserMapMaxAggregateInputType
  }

  export type GetSkillUserMapAggregateType<T extends SkillUserMapAggregateArgs> = {
        [P in keyof T & keyof AggregateSkillUserMap]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSkillUserMap[P]>
      : GetScalarType<T[P], AggregateSkillUserMap[P]>
  }




  export type SkillUserMapGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SkillUserMapWhereInput
    orderBy?: SkillUserMapOrderByWithAggregationInput | SkillUserMapOrderByWithAggregationInput[]
    by: SkillUserMapScalarFieldEnum[] | SkillUserMapScalarFieldEnum
    having?: SkillUserMapScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SkillUserMapCountAggregateInputType | true
    _min?: SkillUserMapMinAggregateInputType
    _max?: SkillUserMapMaxAggregateInputType
  }

  export type SkillUserMapGroupByOutputType = {
    id: string
    skillId: string
    profileId: string
    createdAt: Date
    _count: SkillUserMapCountAggregateOutputType | null
    _min: SkillUserMapMinAggregateOutputType | null
    _max: SkillUserMapMaxAggregateOutputType | null
  }

  type GetSkillUserMapGroupByPayload<T extends SkillUserMapGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SkillUserMapGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SkillUserMapGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SkillUserMapGroupByOutputType[P]>
            : GetScalarType<T[P], SkillUserMapGroupByOutputType[P]>
        }
      >
    >


  export type SkillUserMapSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    skillId?: boolean
    profileId?: boolean
    createdAt?: boolean
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["skillUserMap"]>

  export type SkillUserMapSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    skillId?: boolean
    profileId?: boolean
    createdAt?: boolean
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["skillUserMap"]>

  export type SkillUserMapSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    skillId?: boolean
    profileId?: boolean
    createdAt?: boolean
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["skillUserMap"]>

  export type SkillUserMapSelectScalar = {
    id?: boolean
    skillId?: boolean
    profileId?: boolean
    createdAt?: boolean
  }

  export type SkillUserMapOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "skillId" | "profileId" | "createdAt", ExtArgs["result"]["skillUserMap"]>
  export type SkillUserMapInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }
  export type SkillUserMapIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }
  export type SkillUserMapIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }

  export type $SkillUserMapPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SkillUserMap"
    objects: {
      profile: Prisma.$ProfilePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      skillId: string
      profileId: string
      createdAt: Date
    }, ExtArgs["result"]["skillUserMap"]>
    composites: {}
  }

  type SkillUserMapGetPayload<S extends boolean | null | undefined | SkillUserMapDefaultArgs> = $Result.GetResult<Prisma.$SkillUserMapPayload, S>

  type SkillUserMapCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SkillUserMapFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SkillUserMapCountAggregateInputType | true
    }

  export interface SkillUserMapDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SkillUserMap'], meta: { name: 'SkillUserMap' } }
    /**
     * Find zero or one SkillUserMap that matches the filter.
     * @param {SkillUserMapFindUniqueArgs} args - Arguments to find a SkillUserMap
     * @example
     * // Get one SkillUserMap
     * const skillUserMap = await prisma.skillUserMap.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SkillUserMapFindUniqueArgs>(args: SelectSubset<T, SkillUserMapFindUniqueArgs<ExtArgs>>): Prisma__SkillUserMapClient<$Result.GetResult<Prisma.$SkillUserMapPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SkillUserMap that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SkillUserMapFindUniqueOrThrowArgs} args - Arguments to find a SkillUserMap
     * @example
     * // Get one SkillUserMap
     * const skillUserMap = await prisma.skillUserMap.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SkillUserMapFindUniqueOrThrowArgs>(args: SelectSubset<T, SkillUserMapFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SkillUserMapClient<$Result.GetResult<Prisma.$SkillUserMapPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SkillUserMap that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillUserMapFindFirstArgs} args - Arguments to find a SkillUserMap
     * @example
     * // Get one SkillUserMap
     * const skillUserMap = await prisma.skillUserMap.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SkillUserMapFindFirstArgs>(args?: SelectSubset<T, SkillUserMapFindFirstArgs<ExtArgs>>): Prisma__SkillUserMapClient<$Result.GetResult<Prisma.$SkillUserMapPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SkillUserMap that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillUserMapFindFirstOrThrowArgs} args - Arguments to find a SkillUserMap
     * @example
     * // Get one SkillUserMap
     * const skillUserMap = await prisma.skillUserMap.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SkillUserMapFindFirstOrThrowArgs>(args?: SelectSubset<T, SkillUserMapFindFirstOrThrowArgs<ExtArgs>>): Prisma__SkillUserMapClient<$Result.GetResult<Prisma.$SkillUserMapPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SkillUserMaps that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillUserMapFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SkillUserMaps
     * const skillUserMaps = await prisma.skillUserMap.findMany()
     * 
     * // Get first 10 SkillUserMaps
     * const skillUserMaps = await prisma.skillUserMap.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const skillUserMapWithIdOnly = await prisma.skillUserMap.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SkillUserMapFindManyArgs>(args?: SelectSubset<T, SkillUserMapFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SkillUserMapPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SkillUserMap.
     * @param {SkillUserMapCreateArgs} args - Arguments to create a SkillUserMap.
     * @example
     * // Create one SkillUserMap
     * const SkillUserMap = await prisma.skillUserMap.create({
     *   data: {
     *     // ... data to create a SkillUserMap
     *   }
     * })
     * 
     */
    create<T extends SkillUserMapCreateArgs>(args: SelectSubset<T, SkillUserMapCreateArgs<ExtArgs>>): Prisma__SkillUserMapClient<$Result.GetResult<Prisma.$SkillUserMapPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SkillUserMaps.
     * @param {SkillUserMapCreateManyArgs} args - Arguments to create many SkillUserMaps.
     * @example
     * // Create many SkillUserMaps
     * const skillUserMap = await prisma.skillUserMap.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SkillUserMapCreateManyArgs>(args?: SelectSubset<T, SkillUserMapCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SkillUserMaps and returns the data saved in the database.
     * @param {SkillUserMapCreateManyAndReturnArgs} args - Arguments to create many SkillUserMaps.
     * @example
     * // Create many SkillUserMaps
     * const skillUserMap = await prisma.skillUserMap.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SkillUserMaps and only return the `id`
     * const skillUserMapWithIdOnly = await prisma.skillUserMap.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SkillUserMapCreateManyAndReturnArgs>(args?: SelectSubset<T, SkillUserMapCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SkillUserMapPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SkillUserMap.
     * @param {SkillUserMapDeleteArgs} args - Arguments to delete one SkillUserMap.
     * @example
     * // Delete one SkillUserMap
     * const SkillUserMap = await prisma.skillUserMap.delete({
     *   where: {
     *     // ... filter to delete one SkillUserMap
     *   }
     * })
     * 
     */
    delete<T extends SkillUserMapDeleteArgs>(args: SelectSubset<T, SkillUserMapDeleteArgs<ExtArgs>>): Prisma__SkillUserMapClient<$Result.GetResult<Prisma.$SkillUserMapPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SkillUserMap.
     * @param {SkillUserMapUpdateArgs} args - Arguments to update one SkillUserMap.
     * @example
     * // Update one SkillUserMap
     * const skillUserMap = await prisma.skillUserMap.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SkillUserMapUpdateArgs>(args: SelectSubset<T, SkillUserMapUpdateArgs<ExtArgs>>): Prisma__SkillUserMapClient<$Result.GetResult<Prisma.$SkillUserMapPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SkillUserMaps.
     * @param {SkillUserMapDeleteManyArgs} args - Arguments to filter SkillUserMaps to delete.
     * @example
     * // Delete a few SkillUserMaps
     * const { count } = await prisma.skillUserMap.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SkillUserMapDeleteManyArgs>(args?: SelectSubset<T, SkillUserMapDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SkillUserMaps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillUserMapUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SkillUserMaps
     * const skillUserMap = await prisma.skillUserMap.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SkillUserMapUpdateManyArgs>(args: SelectSubset<T, SkillUserMapUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SkillUserMaps and returns the data updated in the database.
     * @param {SkillUserMapUpdateManyAndReturnArgs} args - Arguments to update many SkillUserMaps.
     * @example
     * // Update many SkillUserMaps
     * const skillUserMap = await prisma.skillUserMap.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SkillUserMaps and only return the `id`
     * const skillUserMapWithIdOnly = await prisma.skillUserMap.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SkillUserMapUpdateManyAndReturnArgs>(args: SelectSubset<T, SkillUserMapUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SkillUserMapPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SkillUserMap.
     * @param {SkillUserMapUpsertArgs} args - Arguments to update or create a SkillUserMap.
     * @example
     * // Update or create a SkillUserMap
     * const skillUserMap = await prisma.skillUserMap.upsert({
     *   create: {
     *     // ... data to create a SkillUserMap
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SkillUserMap we want to update
     *   }
     * })
     */
    upsert<T extends SkillUserMapUpsertArgs>(args: SelectSubset<T, SkillUserMapUpsertArgs<ExtArgs>>): Prisma__SkillUserMapClient<$Result.GetResult<Prisma.$SkillUserMapPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SkillUserMaps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillUserMapCountArgs} args - Arguments to filter SkillUserMaps to count.
     * @example
     * // Count the number of SkillUserMaps
     * const count = await prisma.skillUserMap.count({
     *   where: {
     *     // ... the filter for the SkillUserMaps we want to count
     *   }
     * })
    **/
    count<T extends SkillUserMapCountArgs>(
      args?: Subset<T, SkillUserMapCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SkillUserMapCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SkillUserMap.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillUserMapAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SkillUserMapAggregateArgs>(args: Subset<T, SkillUserMapAggregateArgs>): Prisma.PrismaPromise<GetSkillUserMapAggregateType<T>>

    /**
     * Group by SkillUserMap.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillUserMapGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SkillUserMapGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SkillUserMapGroupByArgs['orderBy'] }
        : { orderBy?: SkillUserMapGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SkillUserMapGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSkillUserMapGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SkillUserMap model
   */
  readonly fields: SkillUserMapFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SkillUserMap.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SkillUserMapClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    profile<T extends ProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProfileDefaultArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SkillUserMap model
   */
  interface SkillUserMapFieldRefs {
    readonly id: FieldRef<"SkillUserMap", 'String'>
    readonly skillId: FieldRef<"SkillUserMap", 'String'>
    readonly profileId: FieldRef<"SkillUserMap", 'String'>
    readonly createdAt: FieldRef<"SkillUserMap", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SkillUserMap findUnique
   */
  export type SkillUserMapFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkillUserMap
     */
    select?: SkillUserMapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkillUserMap
     */
    omit?: SkillUserMapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillUserMapInclude<ExtArgs> | null
    /**
     * Filter, which SkillUserMap to fetch.
     */
    where: SkillUserMapWhereUniqueInput
  }

  /**
   * SkillUserMap findUniqueOrThrow
   */
  export type SkillUserMapFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkillUserMap
     */
    select?: SkillUserMapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkillUserMap
     */
    omit?: SkillUserMapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillUserMapInclude<ExtArgs> | null
    /**
     * Filter, which SkillUserMap to fetch.
     */
    where: SkillUserMapWhereUniqueInput
  }

  /**
   * SkillUserMap findFirst
   */
  export type SkillUserMapFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkillUserMap
     */
    select?: SkillUserMapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkillUserMap
     */
    omit?: SkillUserMapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillUserMapInclude<ExtArgs> | null
    /**
     * Filter, which SkillUserMap to fetch.
     */
    where?: SkillUserMapWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SkillUserMaps to fetch.
     */
    orderBy?: SkillUserMapOrderByWithRelationInput | SkillUserMapOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SkillUserMaps.
     */
    cursor?: SkillUserMapWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SkillUserMaps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SkillUserMaps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SkillUserMaps.
     */
    distinct?: SkillUserMapScalarFieldEnum | SkillUserMapScalarFieldEnum[]
  }

  /**
   * SkillUserMap findFirstOrThrow
   */
  export type SkillUserMapFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkillUserMap
     */
    select?: SkillUserMapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkillUserMap
     */
    omit?: SkillUserMapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillUserMapInclude<ExtArgs> | null
    /**
     * Filter, which SkillUserMap to fetch.
     */
    where?: SkillUserMapWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SkillUserMaps to fetch.
     */
    orderBy?: SkillUserMapOrderByWithRelationInput | SkillUserMapOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SkillUserMaps.
     */
    cursor?: SkillUserMapWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SkillUserMaps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SkillUserMaps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SkillUserMaps.
     */
    distinct?: SkillUserMapScalarFieldEnum | SkillUserMapScalarFieldEnum[]
  }

  /**
   * SkillUserMap findMany
   */
  export type SkillUserMapFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkillUserMap
     */
    select?: SkillUserMapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkillUserMap
     */
    omit?: SkillUserMapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillUserMapInclude<ExtArgs> | null
    /**
     * Filter, which SkillUserMaps to fetch.
     */
    where?: SkillUserMapWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SkillUserMaps to fetch.
     */
    orderBy?: SkillUserMapOrderByWithRelationInput | SkillUserMapOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SkillUserMaps.
     */
    cursor?: SkillUserMapWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SkillUserMaps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SkillUserMaps.
     */
    skip?: number
    distinct?: SkillUserMapScalarFieldEnum | SkillUserMapScalarFieldEnum[]
  }

  /**
   * SkillUserMap create
   */
  export type SkillUserMapCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkillUserMap
     */
    select?: SkillUserMapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkillUserMap
     */
    omit?: SkillUserMapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillUserMapInclude<ExtArgs> | null
    /**
     * The data needed to create a SkillUserMap.
     */
    data: XOR<SkillUserMapCreateInput, SkillUserMapUncheckedCreateInput>
  }

  /**
   * SkillUserMap createMany
   */
  export type SkillUserMapCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SkillUserMaps.
     */
    data: SkillUserMapCreateManyInput | SkillUserMapCreateManyInput[]
  }

  /**
   * SkillUserMap createManyAndReturn
   */
  export type SkillUserMapCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkillUserMap
     */
    select?: SkillUserMapSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SkillUserMap
     */
    omit?: SkillUserMapOmit<ExtArgs> | null
    /**
     * The data used to create many SkillUserMaps.
     */
    data: SkillUserMapCreateManyInput | SkillUserMapCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillUserMapIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SkillUserMap update
   */
  export type SkillUserMapUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkillUserMap
     */
    select?: SkillUserMapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkillUserMap
     */
    omit?: SkillUserMapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillUserMapInclude<ExtArgs> | null
    /**
     * The data needed to update a SkillUserMap.
     */
    data: XOR<SkillUserMapUpdateInput, SkillUserMapUncheckedUpdateInput>
    /**
     * Choose, which SkillUserMap to update.
     */
    where: SkillUserMapWhereUniqueInput
  }

  /**
   * SkillUserMap updateMany
   */
  export type SkillUserMapUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SkillUserMaps.
     */
    data: XOR<SkillUserMapUpdateManyMutationInput, SkillUserMapUncheckedUpdateManyInput>
    /**
     * Filter which SkillUserMaps to update
     */
    where?: SkillUserMapWhereInput
    /**
     * Limit how many SkillUserMaps to update.
     */
    limit?: number
  }

  /**
   * SkillUserMap updateManyAndReturn
   */
  export type SkillUserMapUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkillUserMap
     */
    select?: SkillUserMapSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SkillUserMap
     */
    omit?: SkillUserMapOmit<ExtArgs> | null
    /**
     * The data used to update SkillUserMaps.
     */
    data: XOR<SkillUserMapUpdateManyMutationInput, SkillUserMapUncheckedUpdateManyInput>
    /**
     * Filter which SkillUserMaps to update
     */
    where?: SkillUserMapWhereInput
    /**
     * Limit how many SkillUserMaps to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillUserMapIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SkillUserMap upsert
   */
  export type SkillUserMapUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkillUserMap
     */
    select?: SkillUserMapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkillUserMap
     */
    omit?: SkillUserMapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillUserMapInclude<ExtArgs> | null
    /**
     * The filter to search for the SkillUserMap to update in case it exists.
     */
    where: SkillUserMapWhereUniqueInput
    /**
     * In case the SkillUserMap found by the `where` argument doesn't exist, create a new SkillUserMap with this data.
     */
    create: XOR<SkillUserMapCreateInput, SkillUserMapUncheckedCreateInput>
    /**
     * In case the SkillUserMap was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SkillUserMapUpdateInput, SkillUserMapUncheckedUpdateInput>
  }

  /**
   * SkillUserMap delete
   */
  export type SkillUserMapDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkillUserMap
     */
    select?: SkillUserMapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkillUserMap
     */
    omit?: SkillUserMapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillUserMapInclude<ExtArgs> | null
    /**
     * Filter which SkillUserMap to delete.
     */
    where: SkillUserMapWhereUniqueInput
  }

  /**
   * SkillUserMap deleteMany
   */
  export type SkillUserMapDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SkillUserMaps to delete
     */
    where?: SkillUserMapWhereInput
    /**
     * Limit how many SkillUserMaps to delete.
     */
    limit?: number
  }

  /**
   * SkillUserMap without action
   */
  export type SkillUserMapDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkillUserMap
     */
    select?: SkillUserMapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkillUserMap
     */
    omit?: SkillUserMapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillUserMapInclude<ExtArgs> | null
  }


  /**
   * Model Education
   */

  export type AggregateEducation = {
    _count: EducationCountAggregateOutputType | null
    _min: EducationMinAggregateOutputType | null
    _max: EducationMaxAggregateOutputType | null
  }

  export type EducationMinAggregateOutputType = {
    id: string | null
    profileId: string | null
    degree: string | null
    institution: string | null
    location: string | null
    startDate: string | null
    endDate: string | null
    grade: string | null
    description: string | null
    isCurrent: boolean | null
  }

  export type EducationMaxAggregateOutputType = {
    id: string | null
    profileId: string | null
    degree: string | null
    institution: string | null
    location: string | null
    startDate: string | null
    endDate: string | null
    grade: string | null
    description: string | null
    isCurrent: boolean | null
  }

  export type EducationCountAggregateOutputType = {
    id: number
    profileId: number
    degree: number
    institution: number
    location: number
    startDate: number
    endDate: number
    grade: number
    description: number
    isCurrent: number
    _all: number
  }


  export type EducationMinAggregateInputType = {
    id?: true
    profileId?: true
    degree?: true
    institution?: true
    location?: true
    startDate?: true
    endDate?: true
    grade?: true
    description?: true
    isCurrent?: true
  }

  export type EducationMaxAggregateInputType = {
    id?: true
    profileId?: true
    degree?: true
    institution?: true
    location?: true
    startDate?: true
    endDate?: true
    grade?: true
    description?: true
    isCurrent?: true
  }

  export type EducationCountAggregateInputType = {
    id?: true
    profileId?: true
    degree?: true
    institution?: true
    location?: true
    startDate?: true
    endDate?: true
    grade?: true
    description?: true
    isCurrent?: true
    _all?: true
  }

  export type EducationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Education to aggregate.
     */
    where?: EducationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Educations to fetch.
     */
    orderBy?: EducationOrderByWithRelationInput | EducationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EducationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Educations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Educations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Educations
    **/
    _count?: true | EducationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EducationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EducationMaxAggregateInputType
  }

  export type GetEducationAggregateType<T extends EducationAggregateArgs> = {
        [P in keyof T & keyof AggregateEducation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEducation[P]>
      : GetScalarType<T[P], AggregateEducation[P]>
  }




  export type EducationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EducationWhereInput
    orderBy?: EducationOrderByWithAggregationInput | EducationOrderByWithAggregationInput[]
    by: EducationScalarFieldEnum[] | EducationScalarFieldEnum
    having?: EducationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EducationCountAggregateInputType | true
    _min?: EducationMinAggregateInputType
    _max?: EducationMaxAggregateInputType
  }

  export type EducationGroupByOutputType = {
    id: string
    profileId: string
    degree: string
    institution: string
    location: string | null
    startDate: string
    endDate: string | null
    grade: string | null
    description: string | null
    isCurrent: boolean
    _count: EducationCountAggregateOutputType | null
    _min: EducationMinAggregateOutputType | null
    _max: EducationMaxAggregateOutputType | null
  }

  type GetEducationGroupByPayload<T extends EducationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EducationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EducationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EducationGroupByOutputType[P]>
            : GetScalarType<T[P], EducationGroupByOutputType[P]>
        }
      >
    >


  export type EducationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    profileId?: boolean
    degree?: boolean
    institution?: boolean
    location?: boolean
    startDate?: boolean
    endDate?: boolean
    grade?: boolean
    description?: boolean
    isCurrent?: boolean
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["education"]>

  export type EducationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    profileId?: boolean
    degree?: boolean
    institution?: boolean
    location?: boolean
    startDate?: boolean
    endDate?: boolean
    grade?: boolean
    description?: boolean
    isCurrent?: boolean
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["education"]>

  export type EducationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    profileId?: boolean
    degree?: boolean
    institution?: boolean
    location?: boolean
    startDate?: boolean
    endDate?: boolean
    grade?: boolean
    description?: boolean
    isCurrent?: boolean
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["education"]>

  export type EducationSelectScalar = {
    id?: boolean
    profileId?: boolean
    degree?: boolean
    institution?: boolean
    location?: boolean
    startDate?: boolean
    endDate?: boolean
    grade?: boolean
    description?: boolean
    isCurrent?: boolean
  }

  export type EducationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "profileId" | "degree" | "institution" | "location" | "startDate" | "endDate" | "grade" | "description" | "isCurrent", ExtArgs["result"]["education"]>
  export type EducationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }
  export type EducationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }
  export type EducationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }

  export type $EducationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Education"
    objects: {
      profile: Prisma.$ProfilePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      profileId: string
      degree: string
      institution: string
      location: string | null
      startDate: string
      endDate: string | null
      grade: string | null
      description: string | null
      isCurrent: boolean
    }, ExtArgs["result"]["education"]>
    composites: {}
  }

  type EducationGetPayload<S extends boolean | null | undefined | EducationDefaultArgs> = $Result.GetResult<Prisma.$EducationPayload, S>

  type EducationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EducationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EducationCountAggregateInputType | true
    }

  export interface EducationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Education'], meta: { name: 'Education' } }
    /**
     * Find zero or one Education that matches the filter.
     * @param {EducationFindUniqueArgs} args - Arguments to find a Education
     * @example
     * // Get one Education
     * const education = await prisma.education.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EducationFindUniqueArgs>(args: SelectSubset<T, EducationFindUniqueArgs<ExtArgs>>): Prisma__EducationClient<$Result.GetResult<Prisma.$EducationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Education that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EducationFindUniqueOrThrowArgs} args - Arguments to find a Education
     * @example
     * // Get one Education
     * const education = await prisma.education.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EducationFindUniqueOrThrowArgs>(args: SelectSubset<T, EducationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EducationClient<$Result.GetResult<Prisma.$EducationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Education that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EducationFindFirstArgs} args - Arguments to find a Education
     * @example
     * // Get one Education
     * const education = await prisma.education.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EducationFindFirstArgs>(args?: SelectSubset<T, EducationFindFirstArgs<ExtArgs>>): Prisma__EducationClient<$Result.GetResult<Prisma.$EducationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Education that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EducationFindFirstOrThrowArgs} args - Arguments to find a Education
     * @example
     * // Get one Education
     * const education = await prisma.education.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EducationFindFirstOrThrowArgs>(args?: SelectSubset<T, EducationFindFirstOrThrowArgs<ExtArgs>>): Prisma__EducationClient<$Result.GetResult<Prisma.$EducationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Educations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EducationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Educations
     * const educations = await prisma.education.findMany()
     * 
     * // Get first 10 Educations
     * const educations = await prisma.education.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const educationWithIdOnly = await prisma.education.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EducationFindManyArgs>(args?: SelectSubset<T, EducationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EducationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Education.
     * @param {EducationCreateArgs} args - Arguments to create a Education.
     * @example
     * // Create one Education
     * const Education = await prisma.education.create({
     *   data: {
     *     // ... data to create a Education
     *   }
     * })
     * 
     */
    create<T extends EducationCreateArgs>(args: SelectSubset<T, EducationCreateArgs<ExtArgs>>): Prisma__EducationClient<$Result.GetResult<Prisma.$EducationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Educations.
     * @param {EducationCreateManyArgs} args - Arguments to create many Educations.
     * @example
     * // Create many Educations
     * const education = await prisma.education.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EducationCreateManyArgs>(args?: SelectSubset<T, EducationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Educations and returns the data saved in the database.
     * @param {EducationCreateManyAndReturnArgs} args - Arguments to create many Educations.
     * @example
     * // Create many Educations
     * const education = await prisma.education.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Educations and only return the `id`
     * const educationWithIdOnly = await prisma.education.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EducationCreateManyAndReturnArgs>(args?: SelectSubset<T, EducationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EducationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Education.
     * @param {EducationDeleteArgs} args - Arguments to delete one Education.
     * @example
     * // Delete one Education
     * const Education = await prisma.education.delete({
     *   where: {
     *     // ... filter to delete one Education
     *   }
     * })
     * 
     */
    delete<T extends EducationDeleteArgs>(args: SelectSubset<T, EducationDeleteArgs<ExtArgs>>): Prisma__EducationClient<$Result.GetResult<Prisma.$EducationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Education.
     * @param {EducationUpdateArgs} args - Arguments to update one Education.
     * @example
     * // Update one Education
     * const education = await prisma.education.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EducationUpdateArgs>(args: SelectSubset<T, EducationUpdateArgs<ExtArgs>>): Prisma__EducationClient<$Result.GetResult<Prisma.$EducationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Educations.
     * @param {EducationDeleteManyArgs} args - Arguments to filter Educations to delete.
     * @example
     * // Delete a few Educations
     * const { count } = await prisma.education.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EducationDeleteManyArgs>(args?: SelectSubset<T, EducationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Educations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EducationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Educations
     * const education = await prisma.education.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EducationUpdateManyArgs>(args: SelectSubset<T, EducationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Educations and returns the data updated in the database.
     * @param {EducationUpdateManyAndReturnArgs} args - Arguments to update many Educations.
     * @example
     * // Update many Educations
     * const education = await prisma.education.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Educations and only return the `id`
     * const educationWithIdOnly = await prisma.education.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EducationUpdateManyAndReturnArgs>(args: SelectSubset<T, EducationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EducationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Education.
     * @param {EducationUpsertArgs} args - Arguments to update or create a Education.
     * @example
     * // Update or create a Education
     * const education = await prisma.education.upsert({
     *   create: {
     *     // ... data to create a Education
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Education we want to update
     *   }
     * })
     */
    upsert<T extends EducationUpsertArgs>(args: SelectSubset<T, EducationUpsertArgs<ExtArgs>>): Prisma__EducationClient<$Result.GetResult<Prisma.$EducationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Educations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EducationCountArgs} args - Arguments to filter Educations to count.
     * @example
     * // Count the number of Educations
     * const count = await prisma.education.count({
     *   where: {
     *     // ... the filter for the Educations we want to count
     *   }
     * })
    **/
    count<T extends EducationCountArgs>(
      args?: Subset<T, EducationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EducationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Education.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EducationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EducationAggregateArgs>(args: Subset<T, EducationAggregateArgs>): Prisma.PrismaPromise<GetEducationAggregateType<T>>

    /**
     * Group by Education.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EducationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EducationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EducationGroupByArgs['orderBy'] }
        : { orderBy?: EducationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EducationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEducationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Education model
   */
  readonly fields: EducationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Education.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EducationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    profile<T extends ProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProfileDefaultArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Education model
   */
  interface EducationFieldRefs {
    readonly id: FieldRef<"Education", 'String'>
    readonly profileId: FieldRef<"Education", 'String'>
    readonly degree: FieldRef<"Education", 'String'>
    readonly institution: FieldRef<"Education", 'String'>
    readonly location: FieldRef<"Education", 'String'>
    readonly startDate: FieldRef<"Education", 'String'>
    readonly endDate: FieldRef<"Education", 'String'>
    readonly grade: FieldRef<"Education", 'String'>
    readonly description: FieldRef<"Education", 'String'>
    readonly isCurrent: FieldRef<"Education", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Education findUnique
   */
  export type EducationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Education
     */
    select?: EducationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Education
     */
    omit?: EducationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EducationInclude<ExtArgs> | null
    /**
     * Filter, which Education to fetch.
     */
    where: EducationWhereUniqueInput
  }

  /**
   * Education findUniqueOrThrow
   */
  export type EducationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Education
     */
    select?: EducationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Education
     */
    omit?: EducationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EducationInclude<ExtArgs> | null
    /**
     * Filter, which Education to fetch.
     */
    where: EducationWhereUniqueInput
  }

  /**
   * Education findFirst
   */
  export type EducationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Education
     */
    select?: EducationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Education
     */
    omit?: EducationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EducationInclude<ExtArgs> | null
    /**
     * Filter, which Education to fetch.
     */
    where?: EducationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Educations to fetch.
     */
    orderBy?: EducationOrderByWithRelationInput | EducationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Educations.
     */
    cursor?: EducationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Educations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Educations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Educations.
     */
    distinct?: EducationScalarFieldEnum | EducationScalarFieldEnum[]
  }

  /**
   * Education findFirstOrThrow
   */
  export type EducationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Education
     */
    select?: EducationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Education
     */
    omit?: EducationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EducationInclude<ExtArgs> | null
    /**
     * Filter, which Education to fetch.
     */
    where?: EducationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Educations to fetch.
     */
    orderBy?: EducationOrderByWithRelationInput | EducationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Educations.
     */
    cursor?: EducationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Educations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Educations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Educations.
     */
    distinct?: EducationScalarFieldEnum | EducationScalarFieldEnum[]
  }

  /**
   * Education findMany
   */
  export type EducationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Education
     */
    select?: EducationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Education
     */
    omit?: EducationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EducationInclude<ExtArgs> | null
    /**
     * Filter, which Educations to fetch.
     */
    where?: EducationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Educations to fetch.
     */
    orderBy?: EducationOrderByWithRelationInput | EducationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Educations.
     */
    cursor?: EducationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Educations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Educations.
     */
    skip?: number
    distinct?: EducationScalarFieldEnum | EducationScalarFieldEnum[]
  }

  /**
   * Education create
   */
  export type EducationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Education
     */
    select?: EducationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Education
     */
    omit?: EducationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EducationInclude<ExtArgs> | null
    /**
     * The data needed to create a Education.
     */
    data: XOR<EducationCreateInput, EducationUncheckedCreateInput>
  }

  /**
   * Education createMany
   */
  export type EducationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Educations.
     */
    data: EducationCreateManyInput | EducationCreateManyInput[]
  }

  /**
   * Education createManyAndReturn
   */
  export type EducationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Education
     */
    select?: EducationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Education
     */
    omit?: EducationOmit<ExtArgs> | null
    /**
     * The data used to create many Educations.
     */
    data: EducationCreateManyInput | EducationCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EducationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Education update
   */
  export type EducationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Education
     */
    select?: EducationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Education
     */
    omit?: EducationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EducationInclude<ExtArgs> | null
    /**
     * The data needed to update a Education.
     */
    data: XOR<EducationUpdateInput, EducationUncheckedUpdateInput>
    /**
     * Choose, which Education to update.
     */
    where: EducationWhereUniqueInput
  }

  /**
   * Education updateMany
   */
  export type EducationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Educations.
     */
    data: XOR<EducationUpdateManyMutationInput, EducationUncheckedUpdateManyInput>
    /**
     * Filter which Educations to update
     */
    where?: EducationWhereInput
    /**
     * Limit how many Educations to update.
     */
    limit?: number
  }

  /**
   * Education updateManyAndReturn
   */
  export type EducationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Education
     */
    select?: EducationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Education
     */
    omit?: EducationOmit<ExtArgs> | null
    /**
     * The data used to update Educations.
     */
    data: XOR<EducationUpdateManyMutationInput, EducationUncheckedUpdateManyInput>
    /**
     * Filter which Educations to update
     */
    where?: EducationWhereInput
    /**
     * Limit how many Educations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EducationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Education upsert
   */
  export type EducationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Education
     */
    select?: EducationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Education
     */
    omit?: EducationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EducationInclude<ExtArgs> | null
    /**
     * The filter to search for the Education to update in case it exists.
     */
    where: EducationWhereUniqueInput
    /**
     * In case the Education found by the `where` argument doesn't exist, create a new Education with this data.
     */
    create: XOR<EducationCreateInput, EducationUncheckedCreateInput>
    /**
     * In case the Education was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EducationUpdateInput, EducationUncheckedUpdateInput>
  }

  /**
   * Education delete
   */
  export type EducationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Education
     */
    select?: EducationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Education
     */
    omit?: EducationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EducationInclude<ExtArgs> | null
    /**
     * Filter which Education to delete.
     */
    where: EducationWhereUniqueInput
  }

  /**
   * Education deleteMany
   */
  export type EducationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Educations to delete
     */
    where?: EducationWhereInput
    /**
     * Limit how many Educations to delete.
     */
    limit?: number
  }

  /**
   * Education without action
   */
  export type EducationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Education
     */
    select?: EducationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Education
     */
    omit?: EducationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EducationInclude<ExtArgs> | null
  }


  /**
   * Model Experience
   */

  export type AggregateExperience = {
    _count: ExperienceCountAggregateOutputType | null
    _min: ExperienceMinAggregateOutputType | null
    _max: ExperienceMaxAggregateOutputType | null
  }

  export type ExperienceMinAggregateOutputType = {
    id: string | null
    profileId: string | null
    jobRoleId: string | null
    companyId: string | null
    location: string | null
    startDate: string | null
    endDate: string | null
    isCurrent: boolean | null
    rolesAndResponsibilities: string | null
  }

  export type ExperienceMaxAggregateOutputType = {
    id: string | null
    profileId: string | null
    jobRoleId: string | null
    companyId: string | null
    location: string | null
    startDate: string | null
    endDate: string | null
    isCurrent: boolean | null
    rolesAndResponsibilities: string | null
  }

  export type ExperienceCountAggregateOutputType = {
    id: number
    profileId: number
    jobRoleId: number
    companyId: number
    location: number
    startDate: number
    endDate: number
    isCurrent: number
    rolesAndResponsibilities: number
    _all: number
  }


  export type ExperienceMinAggregateInputType = {
    id?: true
    profileId?: true
    jobRoleId?: true
    companyId?: true
    location?: true
    startDate?: true
    endDate?: true
    isCurrent?: true
    rolesAndResponsibilities?: true
  }

  export type ExperienceMaxAggregateInputType = {
    id?: true
    profileId?: true
    jobRoleId?: true
    companyId?: true
    location?: true
    startDate?: true
    endDate?: true
    isCurrent?: true
    rolesAndResponsibilities?: true
  }

  export type ExperienceCountAggregateInputType = {
    id?: true
    profileId?: true
    jobRoleId?: true
    companyId?: true
    location?: true
    startDate?: true
    endDate?: true
    isCurrent?: true
    rolesAndResponsibilities?: true
    _all?: true
  }

  export type ExperienceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Experience to aggregate.
     */
    where?: ExperienceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Experiences to fetch.
     */
    orderBy?: ExperienceOrderByWithRelationInput | ExperienceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ExperienceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Experiences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Experiences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Experiences
    **/
    _count?: true | ExperienceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExperienceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExperienceMaxAggregateInputType
  }

  export type GetExperienceAggregateType<T extends ExperienceAggregateArgs> = {
        [P in keyof T & keyof AggregateExperience]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExperience[P]>
      : GetScalarType<T[P], AggregateExperience[P]>
  }




  export type ExperienceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExperienceWhereInput
    orderBy?: ExperienceOrderByWithAggregationInput | ExperienceOrderByWithAggregationInput[]
    by: ExperienceScalarFieldEnum[] | ExperienceScalarFieldEnum
    having?: ExperienceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExperienceCountAggregateInputType | true
    _min?: ExperienceMinAggregateInputType
    _max?: ExperienceMaxAggregateInputType
  }

  export type ExperienceGroupByOutputType = {
    id: string
    profileId: string
    jobRoleId: string | null
    companyId: string
    location: string | null
    startDate: string
    endDate: string | null
    isCurrent: boolean
    rolesAndResponsibilities: string | null
    _count: ExperienceCountAggregateOutputType | null
    _min: ExperienceMinAggregateOutputType | null
    _max: ExperienceMaxAggregateOutputType | null
  }

  type GetExperienceGroupByPayload<T extends ExperienceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExperienceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExperienceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExperienceGroupByOutputType[P]>
            : GetScalarType<T[P], ExperienceGroupByOutputType[P]>
        }
      >
    >


  export type ExperienceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    profileId?: boolean
    jobRoleId?: boolean
    companyId?: boolean
    location?: boolean
    startDate?: boolean
    endDate?: boolean
    isCurrent?: boolean
    rolesAndResponsibilities?: boolean
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["experience"]>

  export type ExperienceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    profileId?: boolean
    jobRoleId?: boolean
    companyId?: boolean
    location?: boolean
    startDate?: boolean
    endDate?: boolean
    isCurrent?: boolean
    rolesAndResponsibilities?: boolean
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["experience"]>

  export type ExperienceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    profileId?: boolean
    jobRoleId?: boolean
    companyId?: boolean
    location?: boolean
    startDate?: boolean
    endDate?: boolean
    isCurrent?: boolean
    rolesAndResponsibilities?: boolean
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["experience"]>

  export type ExperienceSelectScalar = {
    id?: boolean
    profileId?: boolean
    jobRoleId?: boolean
    companyId?: boolean
    location?: boolean
    startDate?: boolean
    endDate?: boolean
    isCurrent?: boolean
    rolesAndResponsibilities?: boolean
  }

  export type ExperienceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "profileId" | "jobRoleId" | "companyId" | "location" | "startDate" | "endDate" | "isCurrent" | "rolesAndResponsibilities", ExtArgs["result"]["experience"]>
  export type ExperienceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }
  export type ExperienceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }
  export type ExperienceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }

  export type $ExperiencePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Experience"
    objects: {
      profile: Prisma.$ProfilePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      profileId: string
      jobRoleId: string | null
      companyId: string
      location: string | null
      startDate: string
      endDate: string | null
      isCurrent: boolean
      rolesAndResponsibilities: string | null
    }, ExtArgs["result"]["experience"]>
    composites: {}
  }

  type ExperienceGetPayload<S extends boolean | null | undefined | ExperienceDefaultArgs> = $Result.GetResult<Prisma.$ExperiencePayload, S>

  type ExperienceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ExperienceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ExperienceCountAggregateInputType | true
    }

  export interface ExperienceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Experience'], meta: { name: 'Experience' } }
    /**
     * Find zero or one Experience that matches the filter.
     * @param {ExperienceFindUniqueArgs} args - Arguments to find a Experience
     * @example
     * // Get one Experience
     * const experience = await prisma.experience.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExperienceFindUniqueArgs>(args: SelectSubset<T, ExperienceFindUniqueArgs<ExtArgs>>): Prisma__ExperienceClient<$Result.GetResult<Prisma.$ExperiencePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Experience that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ExperienceFindUniqueOrThrowArgs} args - Arguments to find a Experience
     * @example
     * // Get one Experience
     * const experience = await prisma.experience.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExperienceFindUniqueOrThrowArgs>(args: SelectSubset<T, ExperienceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ExperienceClient<$Result.GetResult<Prisma.$ExperiencePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Experience that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExperienceFindFirstArgs} args - Arguments to find a Experience
     * @example
     * // Get one Experience
     * const experience = await prisma.experience.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExperienceFindFirstArgs>(args?: SelectSubset<T, ExperienceFindFirstArgs<ExtArgs>>): Prisma__ExperienceClient<$Result.GetResult<Prisma.$ExperiencePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Experience that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExperienceFindFirstOrThrowArgs} args - Arguments to find a Experience
     * @example
     * // Get one Experience
     * const experience = await prisma.experience.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExperienceFindFirstOrThrowArgs>(args?: SelectSubset<T, ExperienceFindFirstOrThrowArgs<ExtArgs>>): Prisma__ExperienceClient<$Result.GetResult<Prisma.$ExperiencePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Experiences that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExperienceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Experiences
     * const experiences = await prisma.experience.findMany()
     * 
     * // Get first 10 Experiences
     * const experiences = await prisma.experience.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const experienceWithIdOnly = await prisma.experience.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ExperienceFindManyArgs>(args?: SelectSubset<T, ExperienceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExperiencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Experience.
     * @param {ExperienceCreateArgs} args - Arguments to create a Experience.
     * @example
     * // Create one Experience
     * const Experience = await prisma.experience.create({
     *   data: {
     *     // ... data to create a Experience
     *   }
     * })
     * 
     */
    create<T extends ExperienceCreateArgs>(args: SelectSubset<T, ExperienceCreateArgs<ExtArgs>>): Prisma__ExperienceClient<$Result.GetResult<Prisma.$ExperiencePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Experiences.
     * @param {ExperienceCreateManyArgs} args - Arguments to create many Experiences.
     * @example
     * // Create many Experiences
     * const experience = await prisma.experience.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ExperienceCreateManyArgs>(args?: SelectSubset<T, ExperienceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Experiences and returns the data saved in the database.
     * @param {ExperienceCreateManyAndReturnArgs} args - Arguments to create many Experiences.
     * @example
     * // Create many Experiences
     * const experience = await prisma.experience.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Experiences and only return the `id`
     * const experienceWithIdOnly = await prisma.experience.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ExperienceCreateManyAndReturnArgs>(args?: SelectSubset<T, ExperienceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExperiencePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Experience.
     * @param {ExperienceDeleteArgs} args - Arguments to delete one Experience.
     * @example
     * // Delete one Experience
     * const Experience = await prisma.experience.delete({
     *   where: {
     *     // ... filter to delete one Experience
     *   }
     * })
     * 
     */
    delete<T extends ExperienceDeleteArgs>(args: SelectSubset<T, ExperienceDeleteArgs<ExtArgs>>): Prisma__ExperienceClient<$Result.GetResult<Prisma.$ExperiencePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Experience.
     * @param {ExperienceUpdateArgs} args - Arguments to update one Experience.
     * @example
     * // Update one Experience
     * const experience = await prisma.experience.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ExperienceUpdateArgs>(args: SelectSubset<T, ExperienceUpdateArgs<ExtArgs>>): Prisma__ExperienceClient<$Result.GetResult<Prisma.$ExperiencePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Experiences.
     * @param {ExperienceDeleteManyArgs} args - Arguments to filter Experiences to delete.
     * @example
     * // Delete a few Experiences
     * const { count } = await prisma.experience.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ExperienceDeleteManyArgs>(args?: SelectSubset<T, ExperienceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Experiences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExperienceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Experiences
     * const experience = await prisma.experience.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ExperienceUpdateManyArgs>(args: SelectSubset<T, ExperienceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Experiences and returns the data updated in the database.
     * @param {ExperienceUpdateManyAndReturnArgs} args - Arguments to update many Experiences.
     * @example
     * // Update many Experiences
     * const experience = await prisma.experience.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Experiences and only return the `id`
     * const experienceWithIdOnly = await prisma.experience.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ExperienceUpdateManyAndReturnArgs>(args: SelectSubset<T, ExperienceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExperiencePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Experience.
     * @param {ExperienceUpsertArgs} args - Arguments to update or create a Experience.
     * @example
     * // Update or create a Experience
     * const experience = await prisma.experience.upsert({
     *   create: {
     *     // ... data to create a Experience
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Experience we want to update
     *   }
     * })
     */
    upsert<T extends ExperienceUpsertArgs>(args: SelectSubset<T, ExperienceUpsertArgs<ExtArgs>>): Prisma__ExperienceClient<$Result.GetResult<Prisma.$ExperiencePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Experiences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExperienceCountArgs} args - Arguments to filter Experiences to count.
     * @example
     * // Count the number of Experiences
     * const count = await prisma.experience.count({
     *   where: {
     *     // ... the filter for the Experiences we want to count
     *   }
     * })
    **/
    count<T extends ExperienceCountArgs>(
      args?: Subset<T, ExperienceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExperienceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Experience.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExperienceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ExperienceAggregateArgs>(args: Subset<T, ExperienceAggregateArgs>): Prisma.PrismaPromise<GetExperienceAggregateType<T>>

    /**
     * Group by Experience.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExperienceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ExperienceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExperienceGroupByArgs['orderBy'] }
        : { orderBy?: ExperienceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ExperienceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExperienceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Experience model
   */
  readonly fields: ExperienceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Experience.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExperienceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    profile<T extends ProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProfileDefaultArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Experience model
   */
  interface ExperienceFieldRefs {
    readonly id: FieldRef<"Experience", 'String'>
    readonly profileId: FieldRef<"Experience", 'String'>
    readonly jobRoleId: FieldRef<"Experience", 'String'>
    readonly companyId: FieldRef<"Experience", 'String'>
    readonly location: FieldRef<"Experience", 'String'>
    readonly startDate: FieldRef<"Experience", 'String'>
    readonly endDate: FieldRef<"Experience", 'String'>
    readonly isCurrent: FieldRef<"Experience", 'Boolean'>
    readonly rolesAndResponsibilities: FieldRef<"Experience", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Experience findUnique
   */
  export type ExperienceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Experience
     */
    select?: ExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Experience
     */
    omit?: ExperienceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperienceInclude<ExtArgs> | null
    /**
     * Filter, which Experience to fetch.
     */
    where: ExperienceWhereUniqueInput
  }

  /**
   * Experience findUniqueOrThrow
   */
  export type ExperienceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Experience
     */
    select?: ExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Experience
     */
    omit?: ExperienceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperienceInclude<ExtArgs> | null
    /**
     * Filter, which Experience to fetch.
     */
    where: ExperienceWhereUniqueInput
  }

  /**
   * Experience findFirst
   */
  export type ExperienceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Experience
     */
    select?: ExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Experience
     */
    omit?: ExperienceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperienceInclude<ExtArgs> | null
    /**
     * Filter, which Experience to fetch.
     */
    where?: ExperienceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Experiences to fetch.
     */
    orderBy?: ExperienceOrderByWithRelationInput | ExperienceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Experiences.
     */
    cursor?: ExperienceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Experiences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Experiences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Experiences.
     */
    distinct?: ExperienceScalarFieldEnum | ExperienceScalarFieldEnum[]
  }

  /**
   * Experience findFirstOrThrow
   */
  export type ExperienceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Experience
     */
    select?: ExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Experience
     */
    omit?: ExperienceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperienceInclude<ExtArgs> | null
    /**
     * Filter, which Experience to fetch.
     */
    where?: ExperienceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Experiences to fetch.
     */
    orderBy?: ExperienceOrderByWithRelationInput | ExperienceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Experiences.
     */
    cursor?: ExperienceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Experiences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Experiences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Experiences.
     */
    distinct?: ExperienceScalarFieldEnum | ExperienceScalarFieldEnum[]
  }

  /**
   * Experience findMany
   */
  export type ExperienceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Experience
     */
    select?: ExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Experience
     */
    omit?: ExperienceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperienceInclude<ExtArgs> | null
    /**
     * Filter, which Experiences to fetch.
     */
    where?: ExperienceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Experiences to fetch.
     */
    orderBy?: ExperienceOrderByWithRelationInput | ExperienceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Experiences.
     */
    cursor?: ExperienceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Experiences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Experiences.
     */
    skip?: number
    distinct?: ExperienceScalarFieldEnum | ExperienceScalarFieldEnum[]
  }

  /**
   * Experience create
   */
  export type ExperienceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Experience
     */
    select?: ExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Experience
     */
    omit?: ExperienceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperienceInclude<ExtArgs> | null
    /**
     * The data needed to create a Experience.
     */
    data: XOR<ExperienceCreateInput, ExperienceUncheckedCreateInput>
  }

  /**
   * Experience createMany
   */
  export type ExperienceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Experiences.
     */
    data: ExperienceCreateManyInput | ExperienceCreateManyInput[]
  }

  /**
   * Experience createManyAndReturn
   */
  export type ExperienceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Experience
     */
    select?: ExperienceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Experience
     */
    omit?: ExperienceOmit<ExtArgs> | null
    /**
     * The data used to create many Experiences.
     */
    data: ExperienceCreateManyInput | ExperienceCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperienceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Experience update
   */
  export type ExperienceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Experience
     */
    select?: ExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Experience
     */
    omit?: ExperienceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperienceInclude<ExtArgs> | null
    /**
     * The data needed to update a Experience.
     */
    data: XOR<ExperienceUpdateInput, ExperienceUncheckedUpdateInput>
    /**
     * Choose, which Experience to update.
     */
    where: ExperienceWhereUniqueInput
  }

  /**
   * Experience updateMany
   */
  export type ExperienceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Experiences.
     */
    data: XOR<ExperienceUpdateManyMutationInput, ExperienceUncheckedUpdateManyInput>
    /**
     * Filter which Experiences to update
     */
    where?: ExperienceWhereInput
    /**
     * Limit how many Experiences to update.
     */
    limit?: number
  }

  /**
   * Experience updateManyAndReturn
   */
  export type ExperienceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Experience
     */
    select?: ExperienceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Experience
     */
    omit?: ExperienceOmit<ExtArgs> | null
    /**
     * The data used to update Experiences.
     */
    data: XOR<ExperienceUpdateManyMutationInput, ExperienceUncheckedUpdateManyInput>
    /**
     * Filter which Experiences to update
     */
    where?: ExperienceWhereInput
    /**
     * Limit how many Experiences to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperienceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Experience upsert
   */
  export type ExperienceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Experience
     */
    select?: ExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Experience
     */
    omit?: ExperienceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperienceInclude<ExtArgs> | null
    /**
     * The filter to search for the Experience to update in case it exists.
     */
    where: ExperienceWhereUniqueInput
    /**
     * In case the Experience found by the `where` argument doesn't exist, create a new Experience with this data.
     */
    create: XOR<ExperienceCreateInput, ExperienceUncheckedCreateInput>
    /**
     * In case the Experience was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExperienceUpdateInput, ExperienceUncheckedUpdateInput>
  }

  /**
   * Experience delete
   */
  export type ExperienceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Experience
     */
    select?: ExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Experience
     */
    omit?: ExperienceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperienceInclude<ExtArgs> | null
    /**
     * Filter which Experience to delete.
     */
    where: ExperienceWhereUniqueInput
  }

  /**
   * Experience deleteMany
   */
  export type ExperienceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Experiences to delete
     */
    where?: ExperienceWhereInput
    /**
     * Limit how many Experiences to delete.
     */
    limit?: number
  }

  /**
   * Experience without action
   */
  export type ExperienceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Experience
     */
    select?: ExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Experience
     */
    omit?: ExperienceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperienceInclude<ExtArgs> | null
  }


  /**
   * Model Resume
   */

  export type AggregateResume = {
    _count: ResumeCountAggregateOutputType | null
    _avg: ResumeAvgAggregateOutputType | null
    _sum: ResumeSumAggregateOutputType | null
    _min: ResumeMinAggregateOutputType | null
    _max: ResumeMaxAggregateOutputType | null
  }

  export type ResumeAvgAggregateOutputType = {
    fileSize: number | null
  }

  export type ResumeSumAggregateOutputType = {
    fileSize: number | null
  }

  export type ResumeMinAggregateOutputType = {
    id: string | null
    profileId: string | null
    title: string | null
    fileName: string | null
    fileUrl: string | null
    fileSize: number | null
    mimeType: string | null
    isDefault: boolean | null
    isActive: boolean | null
    uploadedAt: Date | null
    updatedAt: Date | null
  }

  export type ResumeMaxAggregateOutputType = {
    id: string | null
    profileId: string | null
    title: string | null
    fileName: string | null
    fileUrl: string | null
    fileSize: number | null
    mimeType: string | null
    isDefault: boolean | null
    isActive: boolean | null
    uploadedAt: Date | null
    updatedAt: Date | null
  }

  export type ResumeCountAggregateOutputType = {
    id: number
    profileId: number
    title: number
    fileName: number
    fileUrl: number
    fileSize: number
    mimeType: number
    isDefault: number
    isActive: number
    uploadedAt: number
    updatedAt: number
    _all: number
  }


  export type ResumeAvgAggregateInputType = {
    fileSize?: true
  }

  export type ResumeSumAggregateInputType = {
    fileSize?: true
  }

  export type ResumeMinAggregateInputType = {
    id?: true
    profileId?: true
    title?: true
    fileName?: true
    fileUrl?: true
    fileSize?: true
    mimeType?: true
    isDefault?: true
    isActive?: true
    uploadedAt?: true
    updatedAt?: true
  }

  export type ResumeMaxAggregateInputType = {
    id?: true
    profileId?: true
    title?: true
    fileName?: true
    fileUrl?: true
    fileSize?: true
    mimeType?: true
    isDefault?: true
    isActive?: true
    uploadedAt?: true
    updatedAt?: true
  }

  export type ResumeCountAggregateInputType = {
    id?: true
    profileId?: true
    title?: true
    fileName?: true
    fileUrl?: true
    fileSize?: true
    mimeType?: true
    isDefault?: true
    isActive?: true
    uploadedAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ResumeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Resume to aggregate.
     */
    where?: ResumeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Resumes to fetch.
     */
    orderBy?: ResumeOrderByWithRelationInput | ResumeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ResumeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Resumes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Resumes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Resumes
    **/
    _count?: true | ResumeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ResumeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ResumeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ResumeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ResumeMaxAggregateInputType
  }

  export type GetResumeAggregateType<T extends ResumeAggregateArgs> = {
        [P in keyof T & keyof AggregateResume]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateResume[P]>
      : GetScalarType<T[P], AggregateResume[P]>
  }




  export type ResumeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResumeWhereInput
    orderBy?: ResumeOrderByWithAggregationInput | ResumeOrderByWithAggregationInput[]
    by: ResumeScalarFieldEnum[] | ResumeScalarFieldEnum
    having?: ResumeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ResumeCountAggregateInputType | true
    _avg?: ResumeAvgAggregateInputType
    _sum?: ResumeSumAggregateInputType
    _min?: ResumeMinAggregateInputType
    _max?: ResumeMaxAggregateInputType
  }

  export type ResumeGroupByOutputType = {
    id: string
    profileId: string
    title: string
    fileName: string
    fileUrl: string
    fileSize: number | null
    mimeType: string
    isDefault: boolean
    isActive: boolean
    uploadedAt: Date
    updatedAt: Date
    _count: ResumeCountAggregateOutputType | null
    _avg: ResumeAvgAggregateOutputType | null
    _sum: ResumeSumAggregateOutputType | null
    _min: ResumeMinAggregateOutputType | null
    _max: ResumeMaxAggregateOutputType | null
  }

  type GetResumeGroupByPayload<T extends ResumeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ResumeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ResumeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ResumeGroupByOutputType[P]>
            : GetScalarType<T[P], ResumeGroupByOutputType[P]>
        }
      >
    >


  export type ResumeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    profileId?: boolean
    title?: boolean
    fileName?: boolean
    fileUrl?: boolean
    fileSize?: boolean
    mimeType?: boolean
    isDefault?: boolean
    isActive?: boolean
    uploadedAt?: boolean
    updatedAt?: boolean
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["resume"]>

  export type ResumeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    profileId?: boolean
    title?: boolean
    fileName?: boolean
    fileUrl?: boolean
    fileSize?: boolean
    mimeType?: boolean
    isDefault?: boolean
    isActive?: boolean
    uploadedAt?: boolean
    updatedAt?: boolean
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["resume"]>

  export type ResumeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    profileId?: boolean
    title?: boolean
    fileName?: boolean
    fileUrl?: boolean
    fileSize?: boolean
    mimeType?: boolean
    isDefault?: boolean
    isActive?: boolean
    uploadedAt?: boolean
    updatedAt?: boolean
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["resume"]>

  export type ResumeSelectScalar = {
    id?: boolean
    profileId?: boolean
    title?: boolean
    fileName?: boolean
    fileUrl?: boolean
    fileSize?: boolean
    mimeType?: boolean
    isDefault?: boolean
    isActive?: boolean
    uploadedAt?: boolean
    updatedAt?: boolean
  }

  export type ResumeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "profileId" | "title" | "fileName" | "fileUrl" | "fileSize" | "mimeType" | "isDefault" | "isActive" | "uploadedAt" | "updatedAt", ExtArgs["result"]["resume"]>
  export type ResumeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }
  export type ResumeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }
  export type ResumeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }

  export type $ResumePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Resume"
    objects: {
      profile: Prisma.$ProfilePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      profileId: string
      title: string
      fileName: string
      fileUrl: string
      fileSize: number | null
      mimeType: string
      isDefault: boolean
      isActive: boolean
      uploadedAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["resume"]>
    composites: {}
  }

  type ResumeGetPayload<S extends boolean | null | undefined | ResumeDefaultArgs> = $Result.GetResult<Prisma.$ResumePayload, S>

  type ResumeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ResumeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ResumeCountAggregateInputType | true
    }

  export interface ResumeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Resume'], meta: { name: 'Resume' } }
    /**
     * Find zero or one Resume that matches the filter.
     * @param {ResumeFindUniqueArgs} args - Arguments to find a Resume
     * @example
     * // Get one Resume
     * const resume = await prisma.resume.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ResumeFindUniqueArgs>(args: SelectSubset<T, ResumeFindUniqueArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Resume that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ResumeFindUniqueOrThrowArgs} args - Arguments to find a Resume
     * @example
     * // Get one Resume
     * const resume = await prisma.resume.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ResumeFindUniqueOrThrowArgs>(args: SelectSubset<T, ResumeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Resume that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeFindFirstArgs} args - Arguments to find a Resume
     * @example
     * // Get one Resume
     * const resume = await prisma.resume.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ResumeFindFirstArgs>(args?: SelectSubset<T, ResumeFindFirstArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Resume that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeFindFirstOrThrowArgs} args - Arguments to find a Resume
     * @example
     * // Get one Resume
     * const resume = await prisma.resume.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ResumeFindFirstOrThrowArgs>(args?: SelectSubset<T, ResumeFindFirstOrThrowArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Resumes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Resumes
     * const resumes = await prisma.resume.findMany()
     * 
     * // Get first 10 Resumes
     * const resumes = await prisma.resume.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const resumeWithIdOnly = await prisma.resume.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ResumeFindManyArgs>(args?: SelectSubset<T, ResumeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Resume.
     * @param {ResumeCreateArgs} args - Arguments to create a Resume.
     * @example
     * // Create one Resume
     * const Resume = await prisma.resume.create({
     *   data: {
     *     // ... data to create a Resume
     *   }
     * })
     * 
     */
    create<T extends ResumeCreateArgs>(args: SelectSubset<T, ResumeCreateArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Resumes.
     * @param {ResumeCreateManyArgs} args - Arguments to create many Resumes.
     * @example
     * // Create many Resumes
     * const resume = await prisma.resume.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ResumeCreateManyArgs>(args?: SelectSubset<T, ResumeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Resumes and returns the data saved in the database.
     * @param {ResumeCreateManyAndReturnArgs} args - Arguments to create many Resumes.
     * @example
     * // Create many Resumes
     * const resume = await prisma.resume.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Resumes and only return the `id`
     * const resumeWithIdOnly = await prisma.resume.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ResumeCreateManyAndReturnArgs>(args?: SelectSubset<T, ResumeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Resume.
     * @param {ResumeDeleteArgs} args - Arguments to delete one Resume.
     * @example
     * // Delete one Resume
     * const Resume = await prisma.resume.delete({
     *   where: {
     *     // ... filter to delete one Resume
     *   }
     * })
     * 
     */
    delete<T extends ResumeDeleteArgs>(args: SelectSubset<T, ResumeDeleteArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Resume.
     * @param {ResumeUpdateArgs} args - Arguments to update one Resume.
     * @example
     * // Update one Resume
     * const resume = await prisma.resume.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ResumeUpdateArgs>(args: SelectSubset<T, ResumeUpdateArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Resumes.
     * @param {ResumeDeleteManyArgs} args - Arguments to filter Resumes to delete.
     * @example
     * // Delete a few Resumes
     * const { count } = await prisma.resume.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ResumeDeleteManyArgs>(args?: SelectSubset<T, ResumeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Resumes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Resumes
     * const resume = await prisma.resume.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ResumeUpdateManyArgs>(args: SelectSubset<T, ResumeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Resumes and returns the data updated in the database.
     * @param {ResumeUpdateManyAndReturnArgs} args - Arguments to update many Resumes.
     * @example
     * // Update many Resumes
     * const resume = await prisma.resume.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Resumes and only return the `id`
     * const resumeWithIdOnly = await prisma.resume.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ResumeUpdateManyAndReturnArgs>(args: SelectSubset<T, ResumeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Resume.
     * @param {ResumeUpsertArgs} args - Arguments to update or create a Resume.
     * @example
     * // Update or create a Resume
     * const resume = await prisma.resume.upsert({
     *   create: {
     *     // ... data to create a Resume
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Resume we want to update
     *   }
     * })
     */
    upsert<T extends ResumeUpsertArgs>(args: SelectSubset<T, ResumeUpsertArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Resumes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeCountArgs} args - Arguments to filter Resumes to count.
     * @example
     * // Count the number of Resumes
     * const count = await prisma.resume.count({
     *   where: {
     *     // ... the filter for the Resumes we want to count
     *   }
     * })
    **/
    count<T extends ResumeCountArgs>(
      args?: Subset<T, ResumeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ResumeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Resume.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ResumeAggregateArgs>(args: Subset<T, ResumeAggregateArgs>): Prisma.PrismaPromise<GetResumeAggregateType<T>>

    /**
     * Group by Resume.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ResumeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ResumeGroupByArgs['orderBy'] }
        : { orderBy?: ResumeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ResumeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetResumeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Resume model
   */
  readonly fields: ResumeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Resume.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ResumeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    profile<T extends ProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProfileDefaultArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Resume model
   */
  interface ResumeFieldRefs {
    readonly id: FieldRef<"Resume", 'String'>
    readonly profileId: FieldRef<"Resume", 'String'>
    readonly title: FieldRef<"Resume", 'String'>
    readonly fileName: FieldRef<"Resume", 'String'>
    readonly fileUrl: FieldRef<"Resume", 'String'>
    readonly fileSize: FieldRef<"Resume", 'Int'>
    readonly mimeType: FieldRef<"Resume", 'String'>
    readonly isDefault: FieldRef<"Resume", 'Boolean'>
    readonly isActive: FieldRef<"Resume", 'Boolean'>
    readonly uploadedAt: FieldRef<"Resume", 'DateTime'>
    readonly updatedAt: FieldRef<"Resume", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Resume findUnique
   */
  export type ResumeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * Filter, which Resume to fetch.
     */
    where: ResumeWhereUniqueInput
  }

  /**
   * Resume findUniqueOrThrow
   */
  export type ResumeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * Filter, which Resume to fetch.
     */
    where: ResumeWhereUniqueInput
  }

  /**
   * Resume findFirst
   */
  export type ResumeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * Filter, which Resume to fetch.
     */
    where?: ResumeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Resumes to fetch.
     */
    orderBy?: ResumeOrderByWithRelationInput | ResumeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Resumes.
     */
    cursor?: ResumeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Resumes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Resumes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Resumes.
     */
    distinct?: ResumeScalarFieldEnum | ResumeScalarFieldEnum[]
  }

  /**
   * Resume findFirstOrThrow
   */
  export type ResumeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * Filter, which Resume to fetch.
     */
    where?: ResumeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Resumes to fetch.
     */
    orderBy?: ResumeOrderByWithRelationInput | ResumeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Resumes.
     */
    cursor?: ResumeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Resumes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Resumes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Resumes.
     */
    distinct?: ResumeScalarFieldEnum | ResumeScalarFieldEnum[]
  }

  /**
   * Resume findMany
   */
  export type ResumeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * Filter, which Resumes to fetch.
     */
    where?: ResumeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Resumes to fetch.
     */
    orderBy?: ResumeOrderByWithRelationInput | ResumeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Resumes.
     */
    cursor?: ResumeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Resumes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Resumes.
     */
    skip?: number
    distinct?: ResumeScalarFieldEnum | ResumeScalarFieldEnum[]
  }

  /**
   * Resume create
   */
  export type ResumeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * The data needed to create a Resume.
     */
    data: XOR<ResumeCreateInput, ResumeUncheckedCreateInput>
  }

  /**
   * Resume createMany
   */
  export type ResumeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Resumes.
     */
    data: ResumeCreateManyInput | ResumeCreateManyInput[]
  }

  /**
   * Resume createManyAndReturn
   */
  export type ResumeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * The data used to create many Resumes.
     */
    data: ResumeCreateManyInput | ResumeCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Resume update
   */
  export type ResumeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * The data needed to update a Resume.
     */
    data: XOR<ResumeUpdateInput, ResumeUncheckedUpdateInput>
    /**
     * Choose, which Resume to update.
     */
    where: ResumeWhereUniqueInput
  }

  /**
   * Resume updateMany
   */
  export type ResumeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Resumes.
     */
    data: XOR<ResumeUpdateManyMutationInput, ResumeUncheckedUpdateManyInput>
    /**
     * Filter which Resumes to update
     */
    where?: ResumeWhereInput
    /**
     * Limit how many Resumes to update.
     */
    limit?: number
  }

  /**
   * Resume updateManyAndReturn
   */
  export type ResumeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * The data used to update Resumes.
     */
    data: XOR<ResumeUpdateManyMutationInput, ResumeUncheckedUpdateManyInput>
    /**
     * Filter which Resumes to update
     */
    where?: ResumeWhereInput
    /**
     * Limit how many Resumes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Resume upsert
   */
  export type ResumeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * The filter to search for the Resume to update in case it exists.
     */
    where: ResumeWhereUniqueInput
    /**
     * In case the Resume found by the `where` argument doesn't exist, create a new Resume with this data.
     */
    create: XOR<ResumeCreateInput, ResumeUncheckedCreateInput>
    /**
     * In case the Resume was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ResumeUpdateInput, ResumeUncheckedUpdateInput>
  }

  /**
   * Resume delete
   */
  export type ResumeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * Filter which Resume to delete.
     */
    where: ResumeWhereUniqueInput
  }

  /**
   * Resume deleteMany
   */
  export type ResumeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Resumes to delete
     */
    where?: ResumeWhereInput
    /**
     * Limit how many Resumes to delete.
     */
    limit?: number
  }

  /**
   * Resume without action
   */
  export type ResumeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
  }


  /**
   * Model NotificationPreferences
   */

  export type AggregateNotificationPreferences = {
    _count: NotificationPreferencesCountAggregateOutputType | null
    _min: NotificationPreferencesMinAggregateOutputType | null
    _max: NotificationPreferencesMaxAggregateOutputType | null
  }

  export type NotificationPreferencesMinAggregateOutputType = {
    id: string | null
    userId: string | null
    jobMatches: boolean | null
    applications: boolean | null
    interviews: boolean | null
    messages: boolean | null
    emailEnabled: boolean | null
    pushEnabled: boolean | null
    quietHours: string | null
    frequency: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NotificationPreferencesMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    jobMatches: boolean | null
    applications: boolean | null
    interviews: boolean | null
    messages: boolean | null
    emailEnabled: boolean | null
    pushEnabled: boolean | null
    quietHours: string | null
    frequency: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NotificationPreferencesCountAggregateOutputType = {
    id: number
    userId: number
    jobMatches: number
    applications: number
    interviews: number
    messages: number
    emailEnabled: number
    pushEnabled: number
    quietHours: number
    frequency: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type NotificationPreferencesMinAggregateInputType = {
    id?: true
    userId?: true
    jobMatches?: true
    applications?: true
    interviews?: true
    messages?: true
    emailEnabled?: true
    pushEnabled?: true
    quietHours?: true
    frequency?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NotificationPreferencesMaxAggregateInputType = {
    id?: true
    userId?: true
    jobMatches?: true
    applications?: true
    interviews?: true
    messages?: true
    emailEnabled?: true
    pushEnabled?: true
    quietHours?: true
    frequency?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NotificationPreferencesCountAggregateInputType = {
    id?: true
    userId?: true
    jobMatches?: true
    applications?: true
    interviews?: true
    messages?: true
    emailEnabled?: true
    pushEnabled?: true
    quietHours?: true
    frequency?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type NotificationPreferencesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NotificationPreferences to aggregate.
     */
    where?: NotificationPreferencesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotificationPreferences to fetch.
     */
    orderBy?: NotificationPreferencesOrderByWithRelationInput | NotificationPreferencesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotificationPreferencesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotificationPreferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotificationPreferences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned NotificationPreferences
    **/
    _count?: true | NotificationPreferencesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationPreferencesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationPreferencesMaxAggregateInputType
  }

  export type GetNotificationPreferencesAggregateType<T extends NotificationPreferencesAggregateArgs> = {
        [P in keyof T & keyof AggregateNotificationPreferences]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotificationPreferences[P]>
      : GetScalarType<T[P], AggregateNotificationPreferences[P]>
  }




  export type NotificationPreferencesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationPreferencesWhereInput
    orderBy?: NotificationPreferencesOrderByWithAggregationInput | NotificationPreferencesOrderByWithAggregationInput[]
    by: NotificationPreferencesScalarFieldEnum[] | NotificationPreferencesScalarFieldEnum
    having?: NotificationPreferencesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationPreferencesCountAggregateInputType | true
    _min?: NotificationPreferencesMinAggregateInputType
    _max?: NotificationPreferencesMaxAggregateInputType
  }

  export type NotificationPreferencesGroupByOutputType = {
    id: string
    userId: string
    jobMatches: boolean
    applications: boolean
    interviews: boolean
    messages: boolean
    emailEnabled: boolean
    pushEnabled: boolean
    quietHours: string | null
    frequency: string
    createdAt: Date
    updatedAt: Date
    _count: NotificationPreferencesCountAggregateOutputType | null
    _min: NotificationPreferencesMinAggregateOutputType | null
    _max: NotificationPreferencesMaxAggregateOutputType | null
  }

  type GetNotificationPreferencesGroupByPayload<T extends NotificationPreferencesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificationPreferencesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificationPreferencesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificationPreferencesGroupByOutputType[P]>
            : GetScalarType<T[P], NotificationPreferencesGroupByOutputType[P]>
        }
      >
    >


  export type NotificationPreferencesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    jobMatches?: boolean
    applications?: boolean
    interviews?: boolean
    messages?: boolean
    emailEnabled?: boolean
    pushEnabled?: boolean
    quietHours?: boolean
    frequency?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notificationPreferences"]>

  export type NotificationPreferencesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    jobMatches?: boolean
    applications?: boolean
    interviews?: boolean
    messages?: boolean
    emailEnabled?: boolean
    pushEnabled?: boolean
    quietHours?: boolean
    frequency?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notificationPreferences"]>

  export type NotificationPreferencesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    jobMatches?: boolean
    applications?: boolean
    interviews?: boolean
    messages?: boolean
    emailEnabled?: boolean
    pushEnabled?: boolean
    quietHours?: boolean
    frequency?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notificationPreferences"]>

  export type NotificationPreferencesSelectScalar = {
    id?: boolean
    userId?: boolean
    jobMatches?: boolean
    applications?: boolean
    interviews?: boolean
    messages?: boolean
    emailEnabled?: boolean
    pushEnabled?: boolean
    quietHours?: boolean
    frequency?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type NotificationPreferencesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "jobMatches" | "applications" | "interviews" | "messages" | "emailEnabled" | "pushEnabled" | "quietHours" | "frequency" | "createdAt" | "updatedAt", ExtArgs["result"]["notificationPreferences"]>
  export type NotificationPreferencesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type NotificationPreferencesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type NotificationPreferencesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $NotificationPreferencesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "NotificationPreferences"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      jobMatches: boolean
      applications: boolean
      interviews: boolean
      messages: boolean
      emailEnabled: boolean
      pushEnabled: boolean
      quietHours: string | null
      frequency: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["notificationPreferences"]>
    composites: {}
  }

  type NotificationPreferencesGetPayload<S extends boolean | null | undefined | NotificationPreferencesDefaultArgs> = $Result.GetResult<Prisma.$NotificationPreferencesPayload, S>

  type NotificationPreferencesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NotificationPreferencesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NotificationPreferencesCountAggregateInputType | true
    }

  export interface NotificationPreferencesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['NotificationPreferences'], meta: { name: 'NotificationPreferences' } }
    /**
     * Find zero or one NotificationPreferences that matches the filter.
     * @param {NotificationPreferencesFindUniqueArgs} args - Arguments to find a NotificationPreferences
     * @example
     * // Get one NotificationPreferences
     * const notificationPreferences = await prisma.notificationPreferences.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotificationPreferencesFindUniqueArgs>(args: SelectSubset<T, NotificationPreferencesFindUniqueArgs<ExtArgs>>): Prisma__NotificationPreferencesClient<$Result.GetResult<Prisma.$NotificationPreferencesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one NotificationPreferences that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NotificationPreferencesFindUniqueOrThrowArgs} args - Arguments to find a NotificationPreferences
     * @example
     * // Get one NotificationPreferences
     * const notificationPreferences = await prisma.notificationPreferences.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotificationPreferencesFindUniqueOrThrowArgs>(args: SelectSubset<T, NotificationPreferencesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NotificationPreferencesClient<$Result.GetResult<Prisma.$NotificationPreferencesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NotificationPreferences that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationPreferencesFindFirstArgs} args - Arguments to find a NotificationPreferences
     * @example
     * // Get one NotificationPreferences
     * const notificationPreferences = await prisma.notificationPreferences.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotificationPreferencesFindFirstArgs>(args?: SelectSubset<T, NotificationPreferencesFindFirstArgs<ExtArgs>>): Prisma__NotificationPreferencesClient<$Result.GetResult<Prisma.$NotificationPreferencesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NotificationPreferences that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationPreferencesFindFirstOrThrowArgs} args - Arguments to find a NotificationPreferences
     * @example
     * // Get one NotificationPreferences
     * const notificationPreferences = await prisma.notificationPreferences.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotificationPreferencesFindFirstOrThrowArgs>(args?: SelectSubset<T, NotificationPreferencesFindFirstOrThrowArgs<ExtArgs>>): Prisma__NotificationPreferencesClient<$Result.GetResult<Prisma.$NotificationPreferencesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more NotificationPreferences that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationPreferencesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all NotificationPreferences
     * const notificationPreferences = await prisma.notificationPreferences.findMany()
     * 
     * // Get first 10 NotificationPreferences
     * const notificationPreferences = await prisma.notificationPreferences.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notificationPreferencesWithIdOnly = await prisma.notificationPreferences.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NotificationPreferencesFindManyArgs>(args?: SelectSubset<T, NotificationPreferencesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPreferencesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a NotificationPreferences.
     * @param {NotificationPreferencesCreateArgs} args - Arguments to create a NotificationPreferences.
     * @example
     * // Create one NotificationPreferences
     * const NotificationPreferences = await prisma.notificationPreferences.create({
     *   data: {
     *     // ... data to create a NotificationPreferences
     *   }
     * })
     * 
     */
    create<T extends NotificationPreferencesCreateArgs>(args: SelectSubset<T, NotificationPreferencesCreateArgs<ExtArgs>>): Prisma__NotificationPreferencesClient<$Result.GetResult<Prisma.$NotificationPreferencesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many NotificationPreferences.
     * @param {NotificationPreferencesCreateManyArgs} args - Arguments to create many NotificationPreferences.
     * @example
     * // Create many NotificationPreferences
     * const notificationPreferences = await prisma.notificationPreferences.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NotificationPreferencesCreateManyArgs>(args?: SelectSubset<T, NotificationPreferencesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many NotificationPreferences and returns the data saved in the database.
     * @param {NotificationPreferencesCreateManyAndReturnArgs} args - Arguments to create many NotificationPreferences.
     * @example
     * // Create many NotificationPreferences
     * const notificationPreferences = await prisma.notificationPreferences.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many NotificationPreferences and only return the `id`
     * const notificationPreferencesWithIdOnly = await prisma.notificationPreferences.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NotificationPreferencesCreateManyAndReturnArgs>(args?: SelectSubset<T, NotificationPreferencesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPreferencesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a NotificationPreferences.
     * @param {NotificationPreferencesDeleteArgs} args - Arguments to delete one NotificationPreferences.
     * @example
     * // Delete one NotificationPreferences
     * const NotificationPreferences = await prisma.notificationPreferences.delete({
     *   where: {
     *     // ... filter to delete one NotificationPreferences
     *   }
     * })
     * 
     */
    delete<T extends NotificationPreferencesDeleteArgs>(args: SelectSubset<T, NotificationPreferencesDeleteArgs<ExtArgs>>): Prisma__NotificationPreferencesClient<$Result.GetResult<Prisma.$NotificationPreferencesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one NotificationPreferences.
     * @param {NotificationPreferencesUpdateArgs} args - Arguments to update one NotificationPreferences.
     * @example
     * // Update one NotificationPreferences
     * const notificationPreferences = await prisma.notificationPreferences.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NotificationPreferencesUpdateArgs>(args: SelectSubset<T, NotificationPreferencesUpdateArgs<ExtArgs>>): Prisma__NotificationPreferencesClient<$Result.GetResult<Prisma.$NotificationPreferencesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more NotificationPreferences.
     * @param {NotificationPreferencesDeleteManyArgs} args - Arguments to filter NotificationPreferences to delete.
     * @example
     * // Delete a few NotificationPreferences
     * const { count } = await prisma.notificationPreferences.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NotificationPreferencesDeleteManyArgs>(args?: SelectSubset<T, NotificationPreferencesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NotificationPreferences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationPreferencesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many NotificationPreferences
     * const notificationPreferences = await prisma.notificationPreferences.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NotificationPreferencesUpdateManyArgs>(args: SelectSubset<T, NotificationPreferencesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NotificationPreferences and returns the data updated in the database.
     * @param {NotificationPreferencesUpdateManyAndReturnArgs} args - Arguments to update many NotificationPreferences.
     * @example
     * // Update many NotificationPreferences
     * const notificationPreferences = await prisma.notificationPreferences.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more NotificationPreferences and only return the `id`
     * const notificationPreferencesWithIdOnly = await prisma.notificationPreferences.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends NotificationPreferencesUpdateManyAndReturnArgs>(args: SelectSubset<T, NotificationPreferencesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPreferencesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one NotificationPreferences.
     * @param {NotificationPreferencesUpsertArgs} args - Arguments to update or create a NotificationPreferences.
     * @example
     * // Update or create a NotificationPreferences
     * const notificationPreferences = await prisma.notificationPreferences.upsert({
     *   create: {
     *     // ... data to create a NotificationPreferences
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the NotificationPreferences we want to update
     *   }
     * })
     */
    upsert<T extends NotificationPreferencesUpsertArgs>(args: SelectSubset<T, NotificationPreferencesUpsertArgs<ExtArgs>>): Prisma__NotificationPreferencesClient<$Result.GetResult<Prisma.$NotificationPreferencesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of NotificationPreferences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationPreferencesCountArgs} args - Arguments to filter NotificationPreferences to count.
     * @example
     * // Count the number of NotificationPreferences
     * const count = await prisma.notificationPreferences.count({
     *   where: {
     *     // ... the filter for the NotificationPreferences we want to count
     *   }
     * })
    **/
    count<T extends NotificationPreferencesCountArgs>(
      args?: Subset<T, NotificationPreferencesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationPreferencesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a NotificationPreferences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationPreferencesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NotificationPreferencesAggregateArgs>(args: Subset<T, NotificationPreferencesAggregateArgs>): Prisma.PrismaPromise<GetNotificationPreferencesAggregateType<T>>

    /**
     * Group by NotificationPreferences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationPreferencesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NotificationPreferencesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificationPreferencesGroupByArgs['orderBy'] }
        : { orderBy?: NotificationPreferencesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NotificationPreferencesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationPreferencesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the NotificationPreferences model
   */
  readonly fields: NotificationPreferencesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for NotificationPreferences.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotificationPreferencesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the NotificationPreferences model
   */
  interface NotificationPreferencesFieldRefs {
    readonly id: FieldRef<"NotificationPreferences", 'String'>
    readonly userId: FieldRef<"NotificationPreferences", 'String'>
    readonly jobMatches: FieldRef<"NotificationPreferences", 'Boolean'>
    readonly applications: FieldRef<"NotificationPreferences", 'Boolean'>
    readonly interviews: FieldRef<"NotificationPreferences", 'Boolean'>
    readonly messages: FieldRef<"NotificationPreferences", 'Boolean'>
    readonly emailEnabled: FieldRef<"NotificationPreferences", 'Boolean'>
    readonly pushEnabled: FieldRef<"NotificationPreferences", 'Boolean'>
    readonly quietHours: FieldRef<"NotificationPreferences", 'String'>
    readonly frequency: FieldRef<"NotificationPreferences", 'String'>
    readonly createdAt: FieldRef<"NotificationPreferences", 'DateTime'>
    readonly updatedAt: FieldRef<"NotificationPreferences", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * NotificationPreferences findUnique
   */
  export type NotificationPreferencesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPreferences
     */
    select?: NotificationPreferencesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationPreferences
     */
    omit?: NotificationPreferencesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationPreferencesInclude<ExtArgs> | null
    /**
     * Filter, which NotificationPreferences to fetch.
     */
    where: NotificationPreferencesWhereUniqueInput
  }

  /**
   * NotificationPreferences findUniqueOrThrow
   */
  export type NotificationPreferencesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPreferences
     */
    select?: NotificationPreferencesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationPreferences
     */
    omit?: NotificationPreferencesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationPreferencesInclude<ExtArgs> | null
    /**
     * Filter, which NotificationPreferences to fetch.
     */
    where: NotificationPreferencesWhereUniqueInput
  }

  /**
   * NotificationPreferences findFirst
   */
  export type NotificationPreferencesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPreferences
     */
    select?: NotificationPreferencesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationPreferences
     */
    omit?: NotificationPreferencesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationPreferencesInclude<ExtArgs> | null
    /**
     * Filter, which NotificationPreferences to fetch.
     */
    where?: NotificationPreferencesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotificationPreferences to fetch.
     */
    orderBy?: NotificationPreferencesOrderByWithRelationInput | NotificationPreferencesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NotificationPreferences.
     */
    cursor?: NotificationPreferencesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotificationPreferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotificationPreferences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NotificationPreferences.
     */
    distinct?: NotificationPreferencesScalarFieldEnum | NotificationPreferencesScalarFieldEnum[]
  }

  /**
   * NotificationPreferences findFirstOrThrow
   */
  export type NotificationPreferencesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPreferences
     */
    select?: NotificationPreferencesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationPreferences
     */
    omit?: NotificationPreferencesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationPreferencesInclude<ExtArgs> | null
    /**
     * Filter, which NotificationPreferences to fetch.
     */
    where?: NotificationPreferencesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotificationPreferences to fetch.
     */
    orderBy?: NotificationPreferencesOrderByWithRelationInput | NotificationPreferencesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NotificationPreferences.
     */
    cursor?: NotificationPreferencesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotificationPreferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotificationPreferences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NotificationPreferences.
     */
    distinct?: NotificationPreferencesScalarFieldEnum | NotificationPreferencesScalarFieldEnum[]
  }

  /**
   * NotificationPreferences findMany
   */
  export type NotificationPreferencesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPreferences
     */
    select?: NotificationPreferencesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationPreferences
     */
    omit?: NotificationPreferencesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationPreferencesInclude<ExtArgs> | null
    /**
     * Filter, which NotificationPreferences to fetch.
     */
    where?: NotificationPreferencesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotificationPreferences to fetch.
     */
    orderBy?: NotificationPreferencesOrderByWithRelationInput | NotificationPreferencesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing NotificationPreferences.
     */
    cursor?: NotificationPreferencesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotificationPreferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotificationPreferences.
     */
    skip?: number
    distinct?: NotificationPreferencesScalarFieldEnum | NotificationPreferencesScalarFieldEnum[]
  }

  /**
   * NotificationPreferences create
   */
  export type NotificationPreferencesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPreferences
     */
    select?: NotificationPreferencesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationPreferences
     */
    omit?: NotificationPreferencesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationPreferencesInclude<ExtArgs> | null
    /**
     * The data needed to create a NotificationPreferences.
     */
    data: XOR<NotificationPreferencesCreateInput, NotificationPreferencesUncheckedCreateInput>
  }

  /**
   * NotificationPreferences createMany
   */
  export type NotificationPreferencesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many NotificationPreferences.
     */
    data: NotificationPreferencesCreateManyInput | NotificationPreferencesCreateManyInput[]
  }

  /**
   * NotificationPreferences createManyAndReturn
   */
  export type NotificationPreferencesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPreferences
     */
    select?: NotificationPreferencesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationPreferences
     */
    omit?: NotificationPreferencesOmit<ExtArgs> | null
    /**
     * The data used to create many NotificationPreferences.
     */
    data: NotificationPreferencesCreateManyInput | NotificationPreferencesCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationPreferencesIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * NotificationPreferences update
   */
  export type NotificationPreferencesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPreferences
     */
    select?: NotificationPreferencesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationPreferences
     */
    omit?: NotificationPreferencesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationPreferencesInclude<ExtArgs> | null
    /**
     * The data needed to update a NotificationPreferences.
     */
    data: XOR<NotificationPreferencesUpdateInput, NotificationPreferencesUncheckedUpdateInput>
    /**
     * Choose, which NotificationPreferences to update.
     */
    where: NotificationPreferencesWhereUniqueInput
  }

  /**
   * NotificationPreferences updateMany
   */
  export type NotificationPreferencesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update NotificationPreferences.
     */
    data: XOR<NotificationPreferencesUpdateManyMutationInput, NotificationPreferencesUncheckedUpdateManyInput>
    /**
     * Filter which NotificationPreferences to update
     */
    where?: NotificationPreferencesWhereInput
    /**
     * Limit how many NotificationPreferences to update.
     */
    limit?: number
  }

  /**
   * NotificationPreferences updateManyAndReturn
   */
  export type NotificationPreferencesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPreferences
     */
    select?: NotificationPreferencesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationPreferences
     */
    omit?: NotificationPreferencesOmit<ExtArgs> | null
    /**
     * The data used to update NotificationPreferences.
     */
    data: XOR<NotificationPreferencesUpdateManyMutationInput, NotificationPreferencesUncheckedUpdateManyInput>
    /**
     * Filter which NotificationPreferences to update
     */
    where?: NotificationPreferencesWhereInput
    /**
     * Limit how many NotificationPreferences to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationPreferencesIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * NotificationPreferences upsert
   */
  export type NotificationPreferencesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPreferences
     */
    select?: NotificationPreferencesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationPreferences
     */
    omit?: NotificationPreferencesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationPreferencesInclude<ExtArgs> | null
    /**
     * The filter to search for the NotificationPreferences to update in case it exists.
     */
    where: NotificationPreferencesWhereUniqueInput
    /**
     * In case the NotificationPreferences found by the `where` argument doesn't exist, create a new NotificationPreferences with this data.
     */
    create: XOR<NotificationPreferencesCreateInput, NotificationPreferencesUncheckedCreateInput>
    /**
     * In case the NotificationPreferences was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotificationPreferencesUpdateInput, NotificationPreferencesUncheckedUpdateInput>
  }

  /**
   * NotificationPreferences delete
   */
  export type NotificationPreferencesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPreferences
     */
    select?: NotificationPreferencesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationPreferences
     */
    omit?: NotificationPreferencesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationPreferencesInclude<ExtArgs> | null
    /**
     * Filter which NotificationPreferences to delete.
     */
    where: NotificationPreferencesWhereUniqueInput
  }

  /**
   * NotificationPreferences deleteMany
   */
  export type NotificationPreferencesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NotificationPreferences to delete
     */
    where?: NotificationPreferencesWhereInput
    /**
     * Limit how many NotificationPreferences to delete.
     */
    limit?: number
  }

  /**
   * NotificationPreferences without action
   */
  export type NotificationPreferencesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPreferences
     */
    select?: NotificationPreferencesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationPreferences
     */
    omit?: NotificationPreferencesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationPreferencesInclude<ExtArgs> | null
  }


  /**
   * Model JobSearchPreferences
   */

  export type AggregateJobSearchPreferences = {
    _count: JobSearchPreferencesCountAggregateOutputType | null
    _avg: JobSearchPreferencesAvgAggregateOutputType | null
    _sum: JobSearchPreferencesSumAggregateOutputType | null
    _min: JobSearchPreferencesMinAggregateOutputType | null
    _max: JobSearchPreferencesMaxAggregateOutputType | null
  }

  export type JobSearchPreferencesAvgAggregateOutputType = {
    minSalary: number | null
    maxSalary: number | null
    maxCommuteMiles: number | null
    minCompanySize: number | null
    maxCompanySize: number | null
  }

  export type JobSearchPreferencesSumAggregateOutputType = {
    minSalary: number | null
    maxSalary: number | null
    maxCommuteMiles: number | null
    minCompanySize: number | null
    maxCompanySize: number | null
  }

  export type JobSearchPreferencesMinAggregateOutputType = {
    id: string | null
    userId: string | null
    desiredJobTypes: string | null
    minSalary: number | null
    maxSalary: number | null
    salaryCurrency: string | null
    salaryPeriod: string | null
    desiredLocations: string | null
    isRemoteOnly: boolean | null
    isWillingToRelocate: boolean | null
    maxCommuteMiles: number | null
    desiredRoles: string | null
    desiredSkills: string | null
    yearsOfExperience: string | null
    desiredIndustries: string | null
    minCompanySize: number | null
    maxCompanySize: number | null
    excludedCompanies: string | null
    isSearchActive: boolean | null
    lastSearchDate: Date | null
    savedSearches: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type JobSearchPreferencesMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    desiredJobTypes: string | null
    minSalary: number | null
    maxSalary: number | null
    salaryCurrency: string | null
    salaryPeriod: string | null
    desiredLocations: string | null
    isRemoteOnly: boolean | null
    isWillingToRelocate: boolean | null
    maxCommuteMiles: number | null
    desiredRoles: string | null
    desiredSkills: string | null
    yearsOfExperience: string | null
    desiredIndustries: string | null
    minCompanySize: number | null
    maxCompanySize: number | null
    excludedCompanies: string | null
    isSearchActive: boolean | null
    lastSearchDate: Date | null
    savedSearches: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type JobSearchPreferencesCountAggregateOutputType = {
    id: number
    userId: number
    desiredJobTypes: number
    minSalary: number
    maxSalary: number
    salaryCurrency: number
    salaryPeriod: number
    desiredLocations: number
    isRemoteOnly: number
    isWillingToRelocate: number
    maxCommuteMiles: number
    desiredRoles: number
    desiredSkills: number
    yearsOfExperience: number
    desiredIndustries: number
    minCompanySize: number
    maxCompanySize: number
    excludedCompanies: number
    isSearchActive: number
    lastSearchDate: number
    savedSearches: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type JobSearchPreferencesAvgAggregateInputType = {
    minSalary?: true
    maxSalary?: true
    maxCommuteMiles?: true
    minCompanySize?: true
    maxCompanySize?: true
  }

  export type JobSearchPreferencesSumAggregateInputType = {
    minSalary?: true
    maxSalary?: true
    maxCommuteMiles?: true
    minCompanySize?: true
    maxCompanySize?: true
  }

  export type JobSearchPreferencesMinAggregateInputType = {
    id?: true
    userId?: true
    desiredJobTypes?: true
    minSalary?: true
    maxSalary?: true
    salaryCurrency?: true
    salaryPeriod?: true
    desiredLocations?: true
    isRemoteOnly?: true
    isWillingToRelocate?: true
    maxCommuteMiles?: true
    desiredRoles?: true
    desiredSkills?: true
    yearsOfExperience?: true
    desiredIndustries?: true
    minCompanySize?: true
    maxCompanySize?: true
    excludedCompanies?: true
    isSearchActive?: true
    lastSearchDate?: true
    savedSearches?: true
    createdAt?: true
    updatedAt?: true
  }

  export type JobSearchPreferencesMaxAggregateInputType = {
    id?: true
    userId?: true
    desiredJobTypes?: true
    minSalary?: true
    maxSalary?: true
    salaryCurrency?: true
    salaryPeriod?: true
    desiredLocations?: true
    isRemoteOnly?: true
    isWillingToRelocate?: true
    maxCommuteMiles?: true
    desiredRoles?: true
    desiredSkills?: true
    yearsOfExperience?: true
    desiredIndustries?: true
    minCompanySize?: true
    maxCompanySize?: true
    excludedCompanies?: true
    isSearchActive?: true
    lastSearchDate?: true
    savedSearches?: true
    createdAt?: true
    updatedAt?: true
  }

  export type JobSearchPreferencesCountAggregateInputType = {
    id?: true
    userId?: true
    desiredJobTypes?: true
    minSalary?: true
    maxSalary?: true
    salaryCurrency?: true
    salaryPeriod?: true
    desiredLocations?: true
    isRemoteOnly?: true
    isWillingToRelocate?: true
    maxCommuteMiles?: true
    desiredRoles?: true
    desiredSkills?: true
    yearsOfExperience?: true
    desiredIndustries?: true
    minCompanySize?: true
    maxCompanySize?: true
    excludedCompanies?: true
    isSearchActive?: true
    lastSearchDate?: true
    savedSearches?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type JobSearchPreferencesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JobSearchPreferences to aggregate.
     */
    where?: JobSearchPreferencesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobSearchPreferences to fetch.
     */
    orderBy?: JobSearchPreferencesOrderByWithRelationInput | JobSearchPreferencesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: JobSearchPreferencesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobSearchPreferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobSearchPreferences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned JobSearchPreferences
    **/
    _count?: true | JobSearchPreferencesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: JobSearchPreferencesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: JobSearchPreferencesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: JobSearchPreferencesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: JobSearchPreferencesMaxAggregateInputType
  }

  export type GetJobSearchPreferencesAggregateType<T extends JobSearchPreferencesAggregateArgs> = {
        [P in keyof T & keyof AggregateJobSearchPreferences]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateJobSearchPreferences[P]>
      : GetScalarType<T[P], AggregateJobSearchPreferences[P]>
  }




  export type JobSearchPreferencesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobSearchPreferencesWhereInput
    orderBy?: JobSearchPreferencesOrderByWithAggregationInput | JobSearchPreferencesOrderByWithAggregationInput[]
    by: JobSearchPreferencesScalarFieldEnum[] | JobSearchPreferencesScalarFieldEnum
    having?: JobSearchPreferencesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: JobSearchPreferencesCountAggregateInputType | true
    _avg?: JobSearchPreferencesAvgAggregateInputType
    _sum?: JobSearchPreferencesSumAggregateInputType
    _min?: JobSearchPreferencesMinAggregateInputType
    _max?: JobSearchPreferencesMaxAggregateInputType
  }

  export type JobSearchPreferencesGroupByOutputType = {
    id: string
    userId: string
    desiredJobTypes: string
    minSalary: number | null
    maxSalary: number | null
    salaryCurrency: string
    salaryPeriod: string
    desiredLocations: string | null
    isRemoteOnly: boolean
    isWillingToRelocate: boolean
    maxCommuteMiles: number | null
    desiredRoles: string
    desiredSkills: string
    yearsOfExperience: string | null
    desiredIndustries: string
    minCompanySize: number | null
    maxCompanySize: number | null
    excludedCompanies: string
    isSearchActive: boolean
    lastSearchDate: Date | null
    savedSearches: string | null
    createdAt: Date
    updatedAt: Date
    _count: JobSearchPreferencesCountAggregateOutputType | null
    _avg: JobSearchPreferencesAvgAggregateOutputType | null
    _sum: JobSearchPreferencesSumAggregateOutputType | null
    _min: JobSearchPreferencesMinAggregateOutputType | null
    _max: JobSearchPreferencesMaxAggregateOutputType | null
  }

  type GetJobSearchPreferencesGroupByPayload<T extends JobSearchPreferencesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<JobSearchPreferencesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof JobSearchPreferencesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], JobSearchPreferencesGroupByOutputType[P]>
            : GetScalarType<T[P], JobSearchPreferencesGroupByOutputType[P]>
        }
      >
    >


  export type JobSearchPreferencesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    desiredJobTypes?: boolean
    minSalary?: boolean
    maxSalary?: boolean
    salaryCurrency?: boolean
    salaryPeriod?: boolean
    desiredLocations?: boolean
    isRemoteOnly?: boolean
    isWillingToRelocate?: boolean
    maxCommuteMiles?: boolean
    desiredRoles?: boolean
    desiredSkills?: boolean
    yearsOfExperience?: boolean
    desiredIndustries?: boolean
    minCompanySize?: boolean
    maxCompanySize?: boolean
    excludedCompanies?: boolean
    isSearchActive?: boolean
    lastSearchDate?: boolean
    savedSearches?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["jobSearchPreferences"]>

  export type JobSearchPreferencesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    desiredJobTypes?: boolean
    minSalary?: boolean
    maxSalary?: boolean
    salaryCurrency?: boolean
    salaryPeriod?: boolean
    desiredLocations?: boolean
    isRemoteOnly?: boolean
    isWillingToRelocate?: boolean
    maxCommuteMiles?: boolean
    desiredRoles?: boolean
    desiredSkills?: boolean
    yearsOfExperience?: boolean
    desiredIndustries?: boolean
    minCompanySize?: boolean
    maxCompanySize?: boolean
    excludedCompanies?: boolean
    isSearchActive?: boolean
    lastSearchDate?: boolean
    savedSearches?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["jobSearchPreferences"]>

  export type JobSearchPreferencesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    desiredJobTypes?: boolean
    minSalary?: boolean
    maxSalary?: boolean
    salaryCurrency?: boolean
    salaryPeriod?: boolean
    desiredLocations?: boolean
    isRemoteOnly?: boolean
    isWillingToRelocate?: boolean
    maxCommuteMiles?: boolean
    desiredRoles?: boolean
    desiredSkills?: boolean
    yearsOfExperience?: boolean
    desiredIndustries?: boolean
    minCompanySize?: boolean
    maxCompanySize?: boolean
    excludedCompanies?: boolean
    isSearchActive?: boolean
    lastSearchDate?: boolean
    savedSearches?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["jobSearchPreferences"]>

  export type JobSearchPreferencesSelectScalar = {
    id?: boolean
    userId?: boolean
    desiredJobTypes?: boolean
    minSalary?: boolean
    maxSalary?: boolean
    salaryCurrency?: boolean
    salaryPeriod?: boolean
    desiredLocations?: boolean
    isRemoteOnly?: boolean
    isWillingToRelocate?: boolean
    maxCommuteMiles?: boolean
    desiredRoles?: boolean
    desiredSkills?: boolean
    yearsOfExperience?: boolean
    desiredIndustries?: boolean
    minCompanySize?: boolean
    maxCompanySize?: boolean
    excludedCompanies?: boolean
    isSearchActive?: boolean
    lastSearchDate?: boolean
    savedSearches?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type JobSearchPreferencesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "desiredJobTypes" | "minSalary" | "maxSalary" | "salaryCurrency" | "salaryPeriod" | "desiredLocations" | "isRemoteOnly" | "isWillingToRelocate" | "maxCommuteMiles" | "desiredRoles" | "desiredSkills" | "yearsOfExperience" | "desiredIndustries" | "minCompanySize" | "maxCompanySize" | "excludedCompanies" | "isSearchActive" | "lastSearchDate" | "savedSearches" | "createdAt" | "updatedAt", ExtArgs["result"]["jobSearchPreferences"]>
  export type JobSearchPreferencesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type JobSearchPreferencesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type JobSearchPreferencesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $JobSearchPreferencesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "JobSearchPreferences"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      desiredJobTypes: string
      minSalary: number | null
      maxSalary: number | null
      salaryCurrency: string
      salaryPeriod: string
      desiredLocations: string | null
      isRemoteOnly: boolean
      isWillingToRelocate: boolean
      maxCommuteMiles: number | null
      desiredRoles: string
      desiredSkills: string
      yearsOfExperience: string | null
      desiredIndustries: string
      minCompanySize: number | null
      maxCompanySize: number | null
      excludedCompanies: string
      isSearchActive: boolean
      lastSearchDate: Date | null
      savedSearches: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["jobSearchPreferences"]>
    composites: {}
  }

  type JobSearchPreferencesGetPayload<S extends boolean | null | undefined | JobSearchPreferencesDefaultArgs> = $Result.GetResult<Prisma.$JobSearchPreferencesPayload, S>

  type JobSearchPreferencesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<JobSearchPreferencesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: JobSearchPreferencesCountAggregateInputType | true
    }

  export interface JobSearchPreferencesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['JobSearchPreferences'], meta: { name: 'JobSearchPreferences' } }
    /**
     * Find zero or one JobSearchPreferences that matches the filter.
     * @param {JobSearchPreferencesFindUniqueArgs} args - Arguments to find a JobSearchPreferences
     * @example
     * // Get one JobSearchPreferences
     * const jobSearchPreferences = await prisma.jobSearchPreferences.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends JobSearchPreferencesFindUniqueArgs>(args: SelectSubset<T, JobSearchPreferencesFindUniqueArgs<ExtArgs>>): Prisma__JobSearchPreferencesClient<$Result.GetResult<Prisma.$JobSearchPreferencesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one JobSearchPreferences that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {JobSearchPreferencesFindUniqueOrThrowArgs} args - Arguments to find a JobSearchPreferences
     * @example
     * // Get one JobSearchPreferences
     * const jobSearchPreferences = await prisma.jobSearchPreferences.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends JobSearchPreferencesFindUniqueOrThrowArgs>(args: SelectSubset<T, JobSearchPreferencesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__JobSearchPreferencesClient<$Result.GetResult<Prisma.$JobSearchPreferencesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first JobSearchPreferences that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobSearchPreferencesFindFirstArgs} args - Arguments to find a JobSearchPreferences
     * @example
     * // Get one JobSearchPreferences
     * const jobSearchPreferences = await prisma.jobSearchPreferences.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends JobSearchPreferencesFindFirstArgs>(args?: SelectSubset<T, JobSearchPreferencesFindFirstArgs<ExtArgs>>): Prisma__JobSearchPreferencesClient<$Result.GetResult<Prisma.$JobSearchPreferencesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first JobSearchPreferences that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobSearchPreferencesFindFirstOrThrowArgs} args - Arguments to find a JobSearchPreferences
     * @example
     * // Get one JobSearchPreferences
     * const jobSearchPreferences = await prisma.jobSearchPreferences.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends JobSearchPreferencesFindFirstOrThrowArgs>(args?: SelectSubset<T, JobSearchPreferencesFindFirstOrThrowArgs<ExtArgs>>): Prisma__JobSearchPreferencesClient<$Result.GetResult<Prisma.$JobSearchPreferencesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more JobSearchPreferences that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobSearchPreferencesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all JobSearchPreferences
     * const jobSearchPreferences = await prisma.jobSearchPreferences.findMany()
     * 
     * // Get first 10 JobSearchPreferences
     * const jobSearchPreferences = await prisma.jobSearchPreferences.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const jobSearchPreferencesWithIdOnly = await prisma.jobSearchPreferences.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends JobSearchPreferencesFindManyArgs>(args?: SelectSubset<T, JobSearchPreferencesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobSearchPreferencesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a JobSearchPreferences.
     * @param {JobSearchPreferencesCreateArgs} args - Arguments to create a JobSearchPreferences.
     * @example
     * // Create one JobSearchPreferences
     * const JobSearchPreferences = await prisma.jobSearchPreferences.create({
     *   data: {
     *     // ... data to create a JobSearchPreferences
     *   }
     * })
     * 
     */
    create<T extends JobSearchPreferencesCreateArgs>(args: SelectSubset<T, JobSearchPreferencesCreateArgs<ExtArgs>>): Prisma__JobSearchPreferencesClient<$Result.GetResult<Prisma.$JobSearchPreferencesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many JobSearchPreferences.
     * @param {JobSearchPreferencesCreateManyArgs} args - Arguments to create many JobSearchPreferences.
     * @example
     * // Create many JobSearchPreferences
     * const jobSearchPreferences = await prisma.jobSearchPreferences.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends JobSearchPreferencesCreateManyArgs>(args?: SelectSubset<T, JobSearchPreferencesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many JobSearchPreferences and returns the data saved in the database.
     * @param {JobSearchPreferencesCreateManyAndReturnArgs} args - Arguments to create many JobSearchPreferences.
     * @example
     * // Create many JobSearchPreferences
     * const jobSearchPreferences = await prisma.jobSearchPreferences.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many JobSearchPreferences and only return the `id`
     * const jobSearchPreferencesWithIdOnly = await prisma.jobSearchPreferences.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends JobSearchPreferencesCreateManyAndReturnArgs>(args?: SelectSubset<T, JobSearchPreferencesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobSearchPreferencesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a JobSearchPreferences.
     * @param {JobSearchPreferencesDeleteArgs} args - Arguments to delete one JobSearchPreferences.
     * @example
     * // Delete one JobSearchPreferences
     * const JobSearchPreferences = await prisma.jobSearchPreferences.delete({
     *   where: {
     *     // ... filter to delete one JobSearchPreferences
     *   }
     * })
     * 
     */
    delete<T extends JobSearchPreferencesDeleteArgs>(args: SelectSubset<T, JobSearchPreferencesDeleteArgs<ExtArgs>>): Prisma__JobSearchPreferencesClient<$Result.GetResult<Prisma.$JobSearchPreferencesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one JobSearchPreferences.
     * @param {JobSearchPreferencesUpdateArgs} args - Arguments to update one JobSearchPreferences.
     * @example
     * // Update one JobSearchPreferences
     * const jobSearchPreferences = await prisma.jobSearchPreferences.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends JobSearchPreferencesUpdateArgs>(args: SelectSubset<T, JobSearchPreferencesUpdateArgs<ExtArgs>>): Prisma__JobSearchPreferencesClient<$Result.GetResult<Prisma.$JobSearchPreferencesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more JobSearchPreferences.
     * @param {JobSearchPreferencesDeleteManyArgs} args - Arguments to filter JobSearchPreferences to delete.
     * @example
     * // Delete a few JobSearchPreferences
     * const { count } = await prisma.jobSearchPreferences.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends JobSearchPreferencesDeleteManyArgs>(args?: SelectSubset<T, JobSearchPreferencesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more JobSearchPreferences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobSearchPreferencesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many JobSearchPreferences
     * const jobSearchPreferences = await prisma.jobSearchPreferences.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends JobSearchPreferencesUpdateManyArgs>(args: SelectSubset<T, JobSearchPreferencesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more JobSearchPreferences and returns the data updated in the database.
     * @param {JobSearchPreferencesUpdateManyAndReturnArgs} args - Arguments to update many JobSearchPreferences.
     * @example
     * // Update many JobSearchPreferences
     * const jobSearchPreferences = await prisma.jobSearchPreferences.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more JobSearchPreferences and only return the `id`
     * const jobSearchPreferencesWithIdOnly = await prisma.jobSearchPreferences.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends JobSearchPreferencesUpdateManyAndReturnArgs>(args: SelectSubset<T, JobSearchPreferencesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobSearchPreferencesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one JobSearchPreferences.
     * @param {JobSearchPreferencesUpsertArgs} args - Arguments to update or create a JobSearchPreferences.
     * @example
     * // Update or create a JobSearchPreferences
     * const jobSearchPreferences = await prisma.jobSearchPreferences.upsert({
     *   create: {
     *     // ... data to create a JobSearchPreferences
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the JobSearchPreferences we want to update
     *   }
     * })
     */
    upsert<T extends JobSearchPreferencesUpsertArgs>(args: SelectSubset<T, JobSearchPreferencesUpsertArgs<ExtArgs>>): Prisma__JobSearchPreferencesClient<$Result.GetResult<Prisma.$JobSearchPreferencesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of JobSearchPreferences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobSearchPreferencesCountArgs} args - Arguments to filter JobSearchPreferences to count.
     * @example
     * // Count the number of JobSearchPreferences
     * const count = await prisma.jobSearchPreferences.count({
     *   where: {
     *     // ... the filter for the JobSearchPreferences we want to count
     *   }
     * })
    **/
    count<T extends JobSearchPreferencesCountArgs>(
      args?: Subset<T, JobSearchPreferencesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], JobSearchPreferencesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a JobSearchPreferences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobSearchPreferencesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends JobSearchPreferencesAggregateArgs>(args: Subset<T, JobSearchPreferencesAggregateArgs>): Prisma.PrismaPromise<GetJobSearchPreferencesAggregateType<T>>

    /**
     * Group by JobSearchPreferences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobSearchPreferencesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends JobSearchPreferencesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: JobSearchPreferencesGroupByArgs['orderBy'] }
        : { orderBy?: JobSearchPreferencesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, JobSearchPreferencesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJobSearchPreferencesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the JobSearchPreferences model
   */
  readonly fields: JobSearchPreferencesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for JobSearchPreferences.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__JobSearchPreferencesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the JobSearchPreferences model
   */
  interface JobSearchPreferencesFieldRefs {
    readonly id: FieldRef<"JobSearchPreferences", 'String'>
    readonly userId: FieldRef<"JobSearchPreferences", 'String'>
    readonly desiredJobTypes: FieldRef<"JobSearchPreferences", 'String'>
    readonly minSalary: FieldRef<"JobSearchPreferences", 'Int'>
    readonly maxSalary: FieldRef<"JobSearchPreferences", 'Int'>
    readonly salaryCurrency: FieldRef<"JobSearchPreferences", 'String'>
    readonly salaryPeriod: FieldRef<"JobSearchPreferences", 'String'>
    readonly desiredLocations: FieldRef<"JobSearchPreferences", 'String'>
    readonly isRemoteOnly: FieldRef<"JobSearchPreferences", 'Boolean'>
    readonly isWillingToRelocate: FieldRef<"JobSearchPreferences", 'Boolean'>
    readonly maxCommuteMiles: FieldRef<"JobSearchPreferences", 'Int'>
    readonly desiredRoles: FieldRef<"JobSearchPreferences", 'String'>
    readonly desiredSkills: FieldRef<"JobSearchPreferences", 'String'>
    readonly yearsOfExperience: FieldRef<"JobSearchPreferences", 'String'>
    readonly desiredIndustries: FieldRef<"JobSearchPreferences", 'String'>
    readonly minCompanySize: FieldRef<"JobSearchPreferences", 'Int'>
    readonly maxCompanySize: FieldRef<"JobSearchPreferences", 'Int'>
    readonly excludedCompanies: FieldRef<"JobSearchPreferences", 'String'>
    readonly isSearchActive: FieldRef<"JobSearchPreferences", 'Boolean'>
    readonly lastSearchDate: FieldRef<"JobSearchPreferences", 'DateTime'>
    readonly savedSearches: FieldRef<"JobSearchPreferences", 'String'>
    readonly createdAt: FieldRef<"JobSearchPreferences", 'DateTime'>
    readonly updatedAt: FieldRef<"JobSearchPreferences", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * JobSearchPreferences findUnique
   */
  export type JobSearchPreferencesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobSearchPreferences
     */
    select?: JobSearchPreferencesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobSearchPreferences
     */
    omit?: JobSearchPreferencesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobSearchPreferencesInclude<ExtArgs> | null
    /**
     * Filter, which JobSearchPreferences to fetch.
     */
    where: JobSearchPreferencesWhereUniqueInput
  }

  /**
   * JobSearchPreferences findUniqueOrThrow
   */
  export type JobSearchPreferencesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobSearchPreferences
     */
    select?: JobSearchPreferencesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobSearchPreferences
     */
    omit?: JobSearchPreferencesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobSearchPreferencesInclude<ExtArgs> | null
    /**
     * Filter, which JobSearchPreferences to fetch.
     */
    where: JobSearchPreferencesWhereUniqueInput
  }

  /**
   * JobSearchPreferences findFirst
   */
  export type JobSearchPreferencesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobSearchPreferences
     */
    select?: JobSearchPreferencesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobSearchPreferences
     */
    omit?: JobSearchPreferencesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobSearchPreferencesInclude<ExtArgs> | null
    /**
     * Filter, which JobSearchPreferences to fetch.
     */
    where?: JobSearchPreferencesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobSearchPreferences to fetch.
     */
    orderBy?: JobSearchPreferencesOrderByWithRelationInput | JobSearchPreferencesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JobSearchPreferences.
     */
    cursor?: JobSearchPreferencesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobSearchPreferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobSearchPreferences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JobSearchPreferences.
     */
    distinct?: JobSearchPreferencesScalarFieldEnum | JobSearchPreferencesScalarFieldEnum[]
  }

  /**
   * JobSearchPreferences findFirstOrThrow
   */
  export type JobSearchPreferencesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobSearchPreferences
     */
    select?: JobSearchPreferencesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobSearchPreferences
     */
    omit?: JobSearchPreferencesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobSearchPreferencesInclude<ExtArgs> | null
    /**
     * Filter, which JobSearchPreferences to fetch.
     */
    where?: JobSearchPreferencesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobSearchPreferences to fetch.
     */
    orderBy?: JobSearchPreferencesOrderByWithRelationInput | JobSearchPreferencesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JobSearchPreferences.
     */
    cursor?: JobSearchPreferencesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobSearchPreferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobSearchPreferences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JobSearchPreferences.
     */
    distinct?: JobSearchPreferencesScalarFieldEnum | JobSearchPreferencesScalarFieldEnum[]
  }

  /**
   * JobSearchPreferences findMany
   */
  export type JobSearchPreferencesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobSearchPreferences
     */
    select?: JobSearchPreferencesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobSearchPreferences
     */
    omit?: JobSearchPreferencesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobSearchPreferencesInclude<ExtArgs> | null
    /**
     * Filter, which JobSearchPreferences to fetch.
     */
    where?: JobSearchPreferencesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobSearchPreferences to fetch.
     */
    orderBy?: JobSearchPreferencesOrderByWithRelationInput | JobSearchPreferencesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing JobSearchPreferences.
     */
    cursor?: JobSearchPreferencesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobSearchPreferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobSearchPreferences.
     */
    skip?: number
    distinct?: JobSearchPreferencesScalarFieldEnum | JobSearchPreferencesScalarFieldEnum[]
  }

  /**
   * JobSearchPreferences create
   */
  export type JobSearchPreferencesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobSearchPreferences
     */
    select?: JobSearchPreferencesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobSearchPreferences
     */
    omit?: JobSearchPreferencesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobSearchPreferencesInclude<ExtArgs> | null
    /**
     * The data needed to create a JobSearchPreferences.
     */
    data: XOR<JobSearchPreferencesCreateInput, JobSearchPreferencesUncheckedCreateInput>
  }

  /**
   * JobSearchPreferences createMany
   */
  export type JobSearchPreferencesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many JobSearchPreferences.
     */
    data: JobSearchPreferencesCreateManyInput | JobSearchPreferencesCreateManyInput[]
  }

  /**
   * JobSearchPreferences createManyAndReturn
   */
  export type JobSearchPreferencesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobSearchPreferences
     */
    select?: JobSearchPreferencesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the JobSearchPreferences
     */
    omit?: JobSearchPreferencesOmit<ExtArgs> | null
    /**
     * The data used to create many JobSearchPreferences.
     */
    data: JobSearchPreferencesCreateManyInput | JobSearchPreferencesCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobSearchPreferencesIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * JobSearchPreferences update
   */
  export type JobSearchPreferencesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobSearchPreferences
     */
    select?: JobSearchPreferencesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobSearchPreferences
     */
    omit?: JobSearchPreferencesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobSearchPreferencesInclude<ExtArgs> | null
    /**
     * The data needed to update a JobSearchPreferences.
     */
    data: XOR<JobSearchPreferencesUpdateInput, JobSearchPreferencesUncheckedUpdateInput>
    /**
     * Choose, which JobSearchPreferences to update.
     */
    where: JobSearchPreferencesWhereUniqueInput
  }

  /**
   * JobSearchPreferences updateMany
   */
  export type JobSearchPreferencesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update JobSearchPreferences.
     */
    data: XOR<JobSearchPreferencesUpdateManyMutationInput, JobSearchPreferencesUncheckedUpdateManyInput>
    /**
     * Filter which JobSearchPreferences to update
     */
    where?: JobSearchPreferencesWhereInput
    /**
     * Limit how many JobSearchPreferences to update.
     */
    limit?: number
  }

  /**
   * JobSearchPreferences updateManyAndReturn
   */
  export type JobSearchPreferencesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobSearchPreferences
     */
    select?: JobSearchPreferencesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the JobSearchPreferences
     */
    omit?: JobSearchPreferencesOmit<ExtArgs> | null
    /**
     * The data used to update JobSearchPreferences.
     */
    data: XOR<JobSearchPreferencesUpdateManyMutationInput, JobSearchPreferencesUncheckedUpdateManyInput>
    /**
     * Filter which JobSearchPreferences to update
     */
    where?: JobSearchPreferencesWhereInput
    /**
     * Limit how many JobSearchPreferences to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobSearchPreferencesIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * JobSearchPreferences upsert
   */
  export type JobSearchPreferencesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobSearchPreferences
     */
    select?: JobSearchPreferencesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobSearchPreferences
     */
    omit?: JobSearchPreferencesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobSearchPreferencesInclude<ExtArgs> | null
    /**
     * The filter to search for the JobSearchPreferences to update in case it exists.
     */
    where: JobSearchPreferencesWhereUniqueInput
    /**
     * In case the JobSearchPreferences found by the `where` argument doesn't exist, create a new JobSearchPreferences with this data.
     */
    create: XOR<JobSearchPreferencesCreateInput, JobSearchPreferencesUncheckedCreateInput>
    /**
     * In case the JobSearchPreferences was found with the provided `where` argument, update it with this data.
     */
    update: XOR<JobSearchPreferencesUpdateInput, JobSearchPreferencesUncheckedUpdateInput>
  }

  /**
   * JobSearchPreferences delete
   */
  export type JobSearchPreferencesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobSearchPreferences
     */
    select?: JobSearchPreferencesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobSearchPreferences
     */
    omit?: JobSearchPreferencesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobSearchPreferencesInclude<ExtArgs> | null
    /**
     * Filter which JobSearchPreferences to delete.
     */
    where: JobSearchPreferencesWhereUniqueInput
  }

  /**
   * JobSearchPreferences deleteMany
   */
  export type JobSearchPreferencesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JobSearchPreferences to delete
     */
    where?: JobSearchPreferencesWhereInput
    /**
     * Limit how many JobSearchPreferences to delete.
     */
    limit?: number
  }

  /**
   * JobSearchPreferences without action
   */
  export type JobSearchPreferencesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobSearchPreferences
     */
    select?: JobSearchPreferencesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobSearchPreferences
     */
    omit?: JobSearchPreferencesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobSearchPreferencesInclude<ExtArgs> | null
  }


  /**
   * Model FCMToken
   */

  export type AggregateFCMToken = {
    _count: FCMTokenCountAggregateOutputType | null
    _min: FCMTokenMinAggregateOutputType | null
    _max: FCMTokenMaxAggregateOutputType | null
  }

  export type FCMTokenMinAggregateOutputType = {
    id: string | null
    userId: string | null
    token: string | null
    platform: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FCMTokenMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    token: string | null
    platform: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FCMTokenCountAggregateOutputType = {
    id: number
    userId: number
    token: number
    platform: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type FCMTokenMinAggregateInputType = {
    id?: true
    userId?: true
    token?: true
    platform?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FCMTokenMaxAggregateInputType = {
    id?: true
    userId?: true
    token?: true
    platform?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FCMTokenCountAggregateInputType = {
    id?: true
    userId?: true
    token?: true
    platform?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type FCMTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FCMToken to aggregate.
     */
    where?: FCMTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FCMTokens to fetch.
     */
    orderBy?: FCMTokenOrderByWithRelationInput | FCMTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FCMTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FCMTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FCMTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FCMTokens
    **/
    _count?: true | FCMTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FCMTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FCMTokenMaxAggregateInputType
  }

  export type GetFCMTokenAggregateType<T extends FCMTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateFCMToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFCMToken[P]>
      : GetScalarType<T[P], AggregateFCMToken[P]>
  }




  export type FCMTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FCMTokenWhereInput
    orderBy?: FCMTokenOrderByWithAggregationInput | FCMTokenOrderByWithAggregationInput[]
    by: FCMTokenScalarFieldEnum[] | FCMTokenScalarFieldEnum
    having?: FCMTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FCMTokenCountAggregateInputType | true
    _min?: FCMTokenMinAggregateInputType
    _max?: FCMTokenMaxAggregateInputType
  }

  export type FCMTokenGroupByOutputType = {
    id: string
    userId: string
    token: string
    platform: string
    createdAt: Date
    updatedAt: Date
    _count: FCMTokenCountAggregateOutputType | null
    _min: FCMTokenMinAggregateOutputType | null
    _max: FCMTokenMaxAggregateOutputType | null
  }

  type GetFCMTokenGroupByPayload<T extends FCMTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FCMTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FCMTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FCMTokenGroupByOutputType[P]>
            : GetScalarType<T[P], FCMTokenGroupByOutputType[P]>
        }
      >
    >


  export type FCMTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    token?: boolean
    platform?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fCMToken"]>

  export type FCMTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    token?: boolean
    platform?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fCMToken"]>

  export type FCMTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    token?: boolean
    platform?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fCMToken"]>

  export type FCMTokenSelectScalar = {
    id?: boolean
    userId?: boolean
    token?: boolean
    platform?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type FCMTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "token" | "platform" | "createdAt" | "updatedAt", ExtArgs["result"]["fCMToken"]>
  export type FCMTokenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type FCMTokenIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type FCMTokenIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $FCMTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FCMToken"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      token: string
      platform: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["fCMToken"]>
    composites: {}
  }

  type FCMTokenGetPayload<S extends boolean | null | undefined | FCMTokenDefaultArgs> = $Result.GetResult<Prisma.$FCMTokenPayload, S>

  type FCMTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FCMTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FCMTokenCountAggregateInputType | true
    }

  export interface FCMTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FCMToken'], meta: { name: 'FCMToken' } }
    /**
     * Find zero or one FCMToken that matches the filter.
     * @param {FCMTokenFindUniqueArgs} args - Arguments to find a FCMToken
     * @example
     * // Get one FCMToken
     * const fCMToken = await prisma.fCMToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FCMTokenFindUniqueArgs>(args: SelectSubset<T, FCMTokenFindUniqueArgs<ExtArgs>>): Prisma__FCMTokenClient<$Result.GetResult<Prisma.$FCMTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FCMToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FCMTokenFindUniqueOrThrowArgs} args - Arguments to find a FCMToken
     * @example
     * // Get one FCMToken
     * const fCMToken = await prisma.fCMToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FCMTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, FCMTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FCMTokenClient<$Result.GetResult<Prisma.$FCMTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FCMToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FCMTokenFindFirstArgs} args - Arguments to find a FCMToken
     * @example
     * // Get one FCMToken
     * const fCMToken = await prisma.fCMToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FCMTokenFindFirstArgs>(args?: SelectSubset<T, FCMTokenFindFirstArgs<ExtArgs>>): Prisma__FCMTokenClient<$Result.GetResult<Prisma.$FCMTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FCMToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FCMTokenFindFirstOrThrowArgs} args - Arguments to find a FCMToken
     * @example
     * // Get one FCMToken
     * const fCMToken = await prisma.fCMToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FCMTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, FCMTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__FCMTokenClient<$Result.GetResult<Prisma.$FCMTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FCMTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FCMTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FCMTokens
     * const fCMTokens = await prisma.fCMToken.findMany()
     * 
     * // Get first 10 FCMTokens
     * const fCMTokens = await prisma.fCMToken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const fCMTokenWithIdOnly = await prisma.fCMToken.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FCMTokenFindManyArgs>(args?: SelectSubset<T, FCMTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FCMTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FCMToken.
     * @param {FCMTokenCreateArgs} args - Arguments to create a FCMToken.
     * @example
     * // Create one FCMToken
     * const FCMToken = await prisma.fCMToken.create({
     *   data: {
     *     // ... data to create a FCMToken
     *   }
     * })
     * 
     */
    create<T extends FCMTokenCreateArgs>(args: SelectSubset<T, FCMTokenCreateArgs<ExtArgs>>): Prisma__FCMTokenClient<$Result.GetResult<Prisma.$FCMTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FCMTokens.
     * @param {FCMTokenCreateManyArgs} args - Arguments to create many FCMTokens.
     * @example
     * // Create many FCMTokens
     * const fCMToken = await prisma.fCMToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FCMTokenCreateManyArgs>(args?: SelectSubset<T, FCMTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FCMTokens and returns the data saved in the database.
     * @param {FCMTokenCreateManyAndReturnArgs} args - Arguments to create many FCMTokens.
     * @example
     * // Create many FCMTokens
     * const fCMToken = await prisma.fCMToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FCMTokens and only return the `id`
     * const fCMTokenWithIdOnly = await prisma.fCMToken.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FCMTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, FCMTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FCMTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FCMToken.
     * @param {FCMTokenDeleteArgs} args - Arguments to delete one FCMToken.
     * @example
     * // Delete one FCMToken
     * const FCMToken = await prisma.fCMToken.delete({
     *   where: {
     *     // ... filter to delete one FCMToken
     *   }
     * })
     * 
     */
    delete<T extends FCMTokenDeleteArgs>(args: SelectSubset<T, FCMTokenDeleteArgs<ExtArgs>>): Prisma__FCMTokenClient<$Result.GetResult<Prisma.$FCMTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FCMToken.
     * @param {FCMTokenUpdateArgs} args - Arguments to update one FCMToken.
     * @example
     * // Update one FCMToken
     * const fCMToken = await prisma.fCMToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FCMTokenUpdateArgs>(args: SelectSubset<T, FCMTokenUpdateArgs<ExtArgs>>): Prisma__FCMTokenClient<$Result.GetResult<Prisma.$FCMTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FCMTokens.
     * @param {FCMTokenDeleteManyArgs} args - Arguments to filter FCMTokens to delete.
     * @example
     * // Delete a few FCMTokens
     * const { count } = await prisma.fCMToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FCMTokenDeleteManyArgs>(args?: SelectSubset<T, FCMTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FCMTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FCMTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FCMTokens
     * const fCMToken = await prisma.fCMToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FCMTokenUpdateManyArgs>(args: SelectSubset<T, FCMTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FCMTokens and returns the data updated in the database.
     * @param {FCMTokenUpdateManyAndReturnArgs} args - Arguments to update many FCMTokens.
     * @example
     * // Update many FCMTokens
     * const fCMToken = await prisma.fCMToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FCMTokens and only return the `id`
     * const fCMTokenWithIdOnly = await prisma.fCMToken.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FCMTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, FCMTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FCMTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FCMToken.
     * @param {FCMTokenUpsertArgs} args - Arguments to update or create a FCMToken.
     * @example
     * // Update or create a FCMToken
     * const fCMToken = await prisma.fCMToken.upsert({
     *   create: {
     *     // ... data to create a FCMToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FCMToken we want to update
     *   }
     * })
     */
    upsert<T extends FCMTokenUpsertArgs>(args: SelectSubset<T, FCMTokenUpsertArgs<ExtArgs>>): Prisma__FCMTokenClient<$Result.GetResult<Prisma.$FCMTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FCMTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FCMTokenCountArgs} args - Arguments to filter FCMTokens to count.
     * @example
     * // Count the number of FCMTokens
     * const count = await prisma.fCMToken.count({
     *   where: {
     *     // ... the filter for the FCMTokens we want to count
     *   }
     * })
    **/
    count<T extends FCMTokenCountArgs>(
      args?: Subset<T, FCMTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FCMTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FCMToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FCMTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FCMTokenAggregateArgs>(args: Subset<T, FCMTokenAggregateArgs>): Prisma.PrismaPromise<GetFCMTokenAggregateType<T>>

    /**
     * Group by FCMToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FCMTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FCMTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FCMTokenGroupByArgs['orderBy'] }
        : { orderBy?: FCMTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FCMTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFCMTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FCMToken model
   */
  readonly fields: FCMTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FCMToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FCMTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FCMToken model
   */
  interface FCMTokenFieldRefs {
    readonly id: FieldRef<"FCMToken", 'String'>
    readonly userId: FieldRef<"FCMToken", 'String'>
    readonly token: FieldRef<"FCMToken", 'String'>
    readonly platform: FieldRef<"FCMToken", 'String'>
    readonly createdAt: FieldRef<"FCMToken", 'DateTime'>
    readonly updatedAt: FieldRef<"FCMToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FCMToken findUnique
   */
  export type FCMTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FCMToken
     */
    select?: FCMTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FCMToken
     */
    omit?: FCMTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FCMTokenInclude<ExtArgs> | null
    /**
     * Filter, which FCMToken to fetch.
     */
    where: FCMTokenWhereUniqueInput
  }

  /**
   * FCMToken findUniqueOrThrow
   */
  export type FCMTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FCMToken
     */
    select?: FCMTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FCMToken
     */
    omit?: FCMTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FCMTokenInclude<ExtArgs> | null
    /**
     * Filter, which FCMToken to fetch.
     */
    where: FCMTokenWhereUniqueInput
  }

  /**
   * FCMToken findFirst
   */
  export type FCMTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FCMToken
     */
    select?: FCMTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FCMToken
     */
    omit?: FCMTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FCMTokenInclude<ExtArgs> | null
    /**
     * Filter, which FCMToken to fetch.
     */
    where?: FCMTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FCMTokens to fetch.
     */
    orderBy?: FCMTokenOrderByWithRelationInput | FCMTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FCMTokens.
     */
    cursor?: FCMTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FCMTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FCMTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FCMTokens.
     */
    distinct?: FCMTokenScalarFieldEnum | FCMTokenScalarFieldEnum[]
  }

  /**
   * FCMToken findFirstOrThrow
   */
  export type FCMTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FCMToken
     */
    select?: FCMTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FCMToken
     */
    omit?: FCMTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FCMTokenInclude<ExtArgs> | null
    /**
     * Filter, which FCMToken to fetch.
     */
    where?: FCMTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FCMTokens to fetch.
     */
    orderBy?: FCMTokenOrderByWithRelationInput | FCMTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FCMTokens.
     */
    cursor?: FCMTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FCMTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FCMTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FCMTokens.
     */
    distinct?: FCMTokenScalarFieldEnum | FCMTokenScalarFieldEnum[]
  }

  /**
   * FCMToken findMany
   */
  export type FCMTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FCMToken
     */
    select?: FCMTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FCMToken
     */
    omit?: FCMTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FCMTokenInclude<ExtArgs> | null
    /**
     * Filter, which FCMTokens to fetch.
     */
    where?: FCMTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FCMTokens to fetch.
     */
    orderBy?: FCMTokenOrderByWithRelationInput | FCMTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FCMTokens.
     */
    cursor?: FCMTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FCMTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FCMTokens.
     */
    skip?: number
    distinct?: FCMTokenScalarFieldEnum | FCMTokenScalarFieldEnum[]
  }

  /**
   * FCMToken create
   */
  export type FCMTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FCMToken
     */
    select?: FCMTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FCMToken
     */
    omit?: FCMTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FCMTokenInclude<ExtArgs> | null
    /**
     * The data needed to create a FCMToken.
     */
    data: XOR<FCMTokenCreateInput, FCMTokenUncheckedCreateInput>
  }

  /**
   * FCMToken createMany
   */
  export type FCMTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FCMTokens.
     */
    data: FCMTokenCreateManyInput | FCMTokenCreateManyInput[]
  }

  /**
   * FCMToken createManyAndReturn
   */
  export type FCMTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FCMToken
     */
    select?: FCMTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FCMToken
     */
    omit?: FCMTokenOmit<ExtArgs> | null
    /**
     * The data used to create many FCMTokens.
     */
    data: FCMTokenCreateManyInput | FCMTokenCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FCMTokenIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * FCMToken update
   */
  export type FCMTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FCMToken
     */
    select?: FCMTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FCMToken
     */
    omit?: FCMTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FCMTokenInclude<ExtArgs> | null
    /**
     * The data needed to update a FCMToken.
     */
    data: XOR<FCMTokenUpdateInput, FCMTokenUncheckedUpdateInput>
    /**
     * Choose, which FCMToken to update.
     */
    where: FCMTokenWhereUniqueInput
  }

  /**
   * FCMToken updateMany
   */
  export type FCMTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FCMTokens.
     */
    data: XOR<FCMTokenUpdateManyMutationInput, FCMTokenUncheckedUpdateManyInput>
    /**
     * Filter which FCMTokens to update
     */
    where?: FCMTokenWhereInput
    /**
     * Limit how many FCMTokens to update.
     */
    limit?: number
  }

  /**
   * FCMToken updateManyAndReturn
   */
  export type FCMTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FCMToken
     */
    select?: FCMTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FCMToken
     */
    omit?: FCMTokenOmit<ExtArgs> | null
    /**
     * The data used to update FCMTokens.
     */
    data: XOR<FCMTokenUpdateManyMutationInput, FCMTokenUncheckedUpdateManyInput>
    /**
     * Filter which FCMTokens to update
     */
    where?: FCMTokenWhereInput
    /**
     * Limit how many FCMTokens to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FCMTokenIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * FCMToken upsert
   */
  export type FCMTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FCMToken
     */
    select?: FCMTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FCMToken
     */
    omit?: FCMTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FCMTokenInclude<ExtArgs> | null
    /**
     * The filter to search for the FCMToken to update in case it exists.
     */
    where: FCMTokenWhereUniqueInput
    /**
     * In case the FCMToken found by the `where` argument doesn't exist, create a new FCMToken with this data.
     */
    create: XOR<FCMTokenCreateInput, FCMTokenUncheckedCreateInput>
    /**
     * In case the FCMToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FCMTokenUpdateInput, FCMTokenUncheckedUpdateInput>
  }

  /**
   * FCMToken delete
   */
  export type FCMTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FCMToken
     */
    select?: FCMTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FCMToken
     */
    omit?: FCMTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FCMTokenInclude<ExtArgs> | null
    /**
     * Filter which FCMToken to delete.
     */
    where: FCMTokenWhereUniqueInput
  }

  /**
   * FCMToken deleteMany
   */
  export type FCMTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FCMTokens to delete
     */
    where?: FCMTokenWhereInput
    /**
     * Limit how many FCMTokens to delete.
     */
    limit?: number
  }

  /**
   * FCMToken without action
   */
  export type FCMTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FCMToken
     */
    select?: FCMTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FCMToken
     */
    omit?: FCMTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FCMTokenInclude<ExtArgs> | null
  }


  /**
   * Model OTP
   */

  export type AggregateOTP = {
    _count: OTPCountAggregateOutputType | null
    _avg: OTPAvgAggregateOutputType | null
    _sum: OTPSumAggregateOutputType | null
    _min: OTPMinAggregateOutputType | null
    _max: OTPMaxAggregateOutputType | null
  }

  export type OTPAvgAggregateOutputType = {
    attempts: number | null
  }

  export type OTPSumAggregateOutputType = {
    attempts: number | null
  }

  export type OTPMinAggregateOutputType = {
    id: string | null
    phoneNumber: string | null
    countryCode: string | null
    otp: string | null
    expiresAt: Date | null
    attempts: number | null
    userId: string | null
    verified: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OTPMaxAggregateOutputType = {
    id: string | null
    phoneNumber: string | null
    countryCode: string | null
    otp: string | null
    expiresAt: Date | null
    attempts: number | null
    userId: string | null
    verified: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OTPCountAggregateOutputType = {
    id: number
    phoneNumber: number
    countryCode: number
    otp: number
    expiresAt: number
    attempts: number
    userId: number
    verified: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type OTPAvgAggregateInputType = {
    attempts?: true
  }

  export type OTPSumAggregateInputType = {
    attempts?: true
  }

  export type OTPMinAggregateInputType = {
    id?: true
    phoneNumber?: true
    countryCode?: true
    otp?: true
    expiresAt?: true
    attempts?: true
    userId?: true
    verified?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OTPMaxAggregateInputType = {
    id?: true
    phoneNumber?: true
    countryCode?: true
    otp?: true
    expiresAt?: true
    attempts?: true
    userId?: true
    verified?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OTPCountAggregateInputType = {
    id?: true
    phoneNumber?: true
    countryCode?: true
    otp?: true
    expiresAt?: true
    attempts?: true
    userId?: true
    verified?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type OTPAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OTP to aggregate.
     */
    where?: OTPWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OTPS to fetch.
     */
    orderBy?: OTPOrderByWithRelationInput | OTPOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OTPWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OTPS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OTPS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OTPS
    **/
    _count?: true | OTPCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OTPAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OTPSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OTPMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OTPMaxAggregateInputType
  }

  export type GetOTPAggregateType<T extends OTPAggregateArgs> = {
        [P in keyof T & keyof AggregateOTP]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOTP[P]>
      : GetScalarType<T[P], AggregateOTP[P]>
  }




  export type OTPGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OTPWhereInput
    orderBy?: OTPOrderByWithAggregationInput | OTPOrderByWithAggregationInput[]
    by: OTPScalarFieldEnum[] | OTPScalarFieldEnum
    having?: OTPScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OTPCountAggregateInputType | true
    _avg?: OTPAvgAggregateInputType
    _sum?: OTPSumAggregateInputType
    _min?: OTPMinAggregateInputType
    _max?: OTPMaxAggregateInputType
  }

  export type OTPGroupByOutputType = {
    id: string
    phoneNumber: string
    countryCode: string
    otp: string
    expiresAt: Date
    attempts: number
    userId: string | null
    verified: boolean
    createdAt: Date
    updatedAt: Date
    _count: OTPCountAggregateOutputType | null
    _avg: OTPAvgAggregateOutputType | null
    _sum: OTPSumAggregateOutputType | null
    _min: OTPMinAggregateOutputType | null
    _max: OTPMaxAggregateOutputType | null
  }

  type GetOTPGroupByPayload<T extends OTPGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OTPGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OTPGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OTPGroupByOutputType[P]>
            : GetScalarType<T[P], OTPGroupByOutputType[P]>
        }
      >
    >


  export type OTPSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    phoneNumber?: boolean
    countryCode?: boolean
    otp?: boolean
    expiresAt?: boolean
    attempts?: boolean
    userId?: boolean
    verified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["oTP"]>

  export type OTPSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    phoneNumber?: boolean
    countryCode?: boolean
    otp?: boolean
    expiresAt?: boolean
    attempts?: boolean
    userId?: boolean
    verified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["oTP"]>

  export type OTPSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    phoneNumber?: boolean
    countryCode?: boolean
    otp?: boolean
    expiresAt?: boolean
    attempts?: boolean
    userId?: boolean
    verified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["oTP"]>

  export type OTPSelectScalar = {
    id?: boolean
    phoneNumber?: boolean
    countryCode?: boolean
    otp?: boolean
    expiresAt?: boolean
    attempts?: boolean
    userId?: boolean
    verified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type OTPOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "phoneNumber" | "countryCode" | "otp" | "expiresAt" | "attempts" | "userId" | "verified" | "createdAt" | "updatedAt", ExtArgs["result"]["oTP"]>

  export type $OTPPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OTP"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      phoneNumber: string
      countryCode: string
      otp: string
      expiresAt: Date
      attempts: number
      userId: string | null
      verified: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["oTP"]>
    composites: {}
  }

  type OTPGetPayload<S extends boolean | null | undefined | OTPDefaultArgs> = $Result.GetResult<Prisma.$OTPPayload, S>

  type OTPCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OTPFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OTPCountAggregateInputType | true
    }

  export interface OTPDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OTP'], meta: { name: 'OTP' } }
    /**
     * Find zero or one OTP that matches the filter.
     * @param {OTPFindUniqueArgs} args - Arguments to find a OTP
     * @example
     * // Get one OTP
     * const oTP = await prisma.oTP.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OTPFindUniqueArgs>(args: SelectSubset<T, OTPFindUniqueArgs<ExtArgs>>): Prisma__OTPClient<$Result.GetResult<Prisma.$OTPPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OTP that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OTPFindUniqueOrThrowArgs} args - Arguments to find a OTP
     * @example
     * // Get one OTP
     * const oTP = await prisma.oTP.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OTPFindUniqueOrThrowArgs>(args: SelectSubset<T, OTPFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OTPClient<$Result.GetResult<Prisma.$OTPPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OTP that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OTPFindFirstArgs} args - Arguments to find a OTP
     * @example
     * // Get one OTP
     * const oTP = await prisma.oTP.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OTPFindFirstArgs>(args?: SelectSubset<T, OTPFindFirstArgs<ExtArgs>>): Prisma__OTPClient<$Result.GetResult<Prisma.$OTPPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OTP that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OTPFindFirstOrThrowArgs} args - Arguments to find a OTP
     * @example
     * // Get one OTP
     * const oTP = await prisma.oTP.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OTPFindFirstOrThrowArgs>(args?: SelectSubset<T, OTPFindFirstOrThrowArgs<ExtArgs>>): Prisma__OTPClient<$Result.GetResult<Prisma.$OTPPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OTPS that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OTPFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OTPS
     * const oTPS = await prisma.oTP.findMany()
     * 
     * // Get first 10 OTPS
     * const oTPS = await prisma.oTP.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const oTPWithIdOnly = await prisma.oTP.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OTPFindManyArgs>(args?: SelectSubset<T, OTPFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OTPPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OTP.
     * @param {OTPCreateArgs} args - Arguments to create a OTP.
     * @example
     * // Create one OTP
     * const OTP = await prisma.oTP.create({
     *   data: {
     *     // ... data to create a OTP
     *   }
     * })
     * 
     */
    create<T extends OTPCreateArgs>(args: SelectSubset<T, OTPCreateArgs<ExtArgs>>): Prisma__OTPClient<$Result.GetResult<Prisma.$OTPPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OTPS.
     * @param {OTPCreateManyArgs} args - Arguments to create many OTPS.
     * @example
     * // Create many OTPS
     * const oTP = await prisma.oTP.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OTPCreateManyArgs>(args?: SelectSubset<T, OTPCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OTPS and returns the data saved in the database.
     * @param {OTPCreateManyAndReturnArgs} args - Arguments to create many OTPS.
     * @example
     * // Create many OTPS
     * const oTP = await prisma.oTP.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OTPS and only return the `id`
     * const oTPWithIdOnly = await prisma.oTP.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OTPCreateManyAndReturnArgs>(args?: SelectSubset<T, OTPCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OTPPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OTP.
     * @param {OTPDeleteArgs} args - Arguments to delete one OTP.
     * @example
     * // Delete one OTP
     * const OTP = await prisma.oTP.delete({
     *   where: {
     *     // ... filter to delete one OTP
     *   }
     * })
     * 
     */
    delete<T extends OTPDeleteArgs>(args: SelectSubset<T, OTPDeleteArgs<ExtArgs>>): Prisma__OTPClient<$Result.GetResult<Prisma.$OTPPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OTP.
     * @param {OTPUpdateArgs} args - Arguments to update one OTP.
     * @example
     * // Update one OTP
     * const oTP = await prisma.oTP.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OTPUpdateArgs>(args: SelectSubset<T, OTPUpdateArgs<ExtArgs>>): Prisma__OTPClient<$Result.GetResult<Prisma.$OTPPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OTPS.
     * @param {OTPDeleteManyArgs} args - Arguments to filter OTPS to delete.
     * @example
     * // Delete a few OTPS
     * const { count } = await prisma.oTP.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OTPDeleteManyArgs>(args?: SelectSubset<T, OTPDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OTPS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OTPUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OTPS
     * const oTP = await prisma.oTP.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OTPUpdateManyArgs>(args: SelectSubset<T, OTPUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OTPS and returns the data updated in the database.
     * @param {OTPUpdateManyAndReturnArgs} args - Arguments to update many OTPS.
     * @example
     * // Update many OTPS
     * const oTP = await prisma.oTP.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OTPS and only return the `id`
     * const oTPWithIdOnly = await prisma.oTP.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OTPUpdateManyAndReturnArgs>(args: SelectSubset<T, OTPUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OTPPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OTP.
     * @param {OTPUpsertArgs} args - Arguments to update or create a OTP.
     * @example
     * // Update or create a OTP
     * const oTP = await prisma.oTP.upsert({
     *   create: {
     *     // ... data to create a OTP
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OTP we want to update
     *   }
     * })
     */
    upsert<T extends OTPUpsertArgs>(args: SelectSubset<T, OTPUpsertArgs<ExtArgs>>): Prisma__OTPClient<$Result.GetResult<Prisma.$OTPPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OTPS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OTPCountArgs} args - Arguments to filter OTPS to count.
     * @example
     * // Count the number of OTPS
     * const count = await prisma.oTP.count({
     *   where: {
     *     // ... the filter for the OTPS we want to count
     *   }
     * })
    **/
    count<T extends OTPCountArgs>(
      args?: Subset<T, OTPCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OTPCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OTP.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OTPAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OTPAggregateArgs>(args: Subset<T, OTPAggregateArgs>): Prisma.PrismaPromise<GetOTPAggregateType<T>>

    /**
     * Group by OTP.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OTPGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OTPGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OTPGroupByArgs['orderBy'] }
        : { orderBy?: OTPGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OTPGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOTPGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OTP model
   */
  readonly fields: OTPFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OTP.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OTPClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OTP model
   */
  interface OTPFieldRefs {
    readonly id: FieldRef<"OTP", 'String'>
    readonly phoneNumber: FieldRef<"OTP", 'String'>
    readonly countryCode: FieldRef<"OTP", 'String'>
    readonly otp: FieldRef<"OTP", 'String'>
    readonly expiresAt: FieldRef<"OTP", 'DateTime'>
    readonly attempts: FieldRef<"OTP", 'Int'>
    readonly userId: FieldRef<"OTP", 'String'>
    readonly verified: FieldRef<"OTP", 'Boolean'>
    readonly createdAt: FieldRef<"OTP", 'DateTime'>
    readonly updatedAt: FieldRef<"OTP", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OTP findUnique
   */
  export type OTPFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OTP
     */
    select?: OTPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OTP
     */
    omit?: OTPOmit<ExtArgs> | null
    /**
     * Filter, which OTP to fetch.
     */
    where: OTPWhereUniqueInput
  }

  /**
   * OTP findUniqueOrThrow
   */
  export type OTPFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OTP
     */
    select?: OTPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OTP
     */
    omit?: OTPOmit<ExtArgs> | null
    /**
     * Filter, which OTP to fetch.
     */
    where: OTPWhereUniqueInput
  }

  /**
   * OTP findFirst
   */
  export type OTPFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OTP
     */
    select?: OTPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OTP
     */
    omit?: OTPOmit<ExtArgs> | null
    /**
     * Filter, which OTP to fetch.
     */
    where?: OTPWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OTPS to fetch.
     */
    orderBy?: OTPOrderByWithRelationInput | OTPOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OTPS.
     */
    cursor?: OTPWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OTPS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OTPS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OTPS.
     */
    distinct?: OTPScalarFieldEnum | OTPScalarFieldEnum[]
  }

  /**
   * OTP findFirstOrThrow
   */
  export type OTPFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OTP
     */
    select?: OTPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OTP
     */
    omit?: OTPOmit<ExtArgs> | null
    /**
     * Filter, which OTP to fetch.
     */
    where?: OTPWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OTPS to fetch.
     */
    orderBy?: OTPOrderByWithRelationInput | OTPOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OTPS.
     */
    cursor?: OTPWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OTPS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OTPS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OTPS.
     */
    distinct?: OTPScalarFieldEnum | OTPScalarFieldEnum[]
  }

  /**
   * OTP findMany
   */
  export type OTPFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OTP
     */
    select?: OTPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OTP
     */
    omit?: OTPOmit<ExtArgs> | null
    /**
     * Filter, which OTPS to fetch.
     */
    where?: OTPWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OTPS to fetch.
     */
    orderBy?: OTPOrderByWithRelationInput | OTPOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OTPS.
     */
    cursor?: OTPWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OTPS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OTPS.
     */
    skip?: number
    distinct?: OTPScalarFieldEnum | OTPScalarFieldEnum[]
  }

  /**
   * OTP create
   */
  export type OTPCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OTP
     */
    select?: OTPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OTP
     */
    omit?: OTPOmit<ExtArgs> | null
    /**
     * The data needed to create a OTP.
     */
    data: XOR<OTPCreateInput, OTPUncheckedCreateInput>
  }

  /**
   * OTP createMany
   */
  export type OTPCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OTPS.
     */
    data: OTPCreateManyInput | OTPCreateManyInput[]
  }

  /**
   * OTP createManyAndReturn
   */
  export type OTPCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OTP
     */
    select?: OTPSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OTP
     */
    omit?: OTPOmit<ExtArgs> | null
    /**
     * The data used to create many OTPS.
     */
    data: OTPCreateManyInput | OTPCreateManyInput[]
  }

  /**
   * OTP update
   */
  export type OTPUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OTP
     */
    select?: OTPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OTP
     */
    omit?: OTPOmit<ExtArgs> | null
    /**
     * The data needed to update a OTP.
     */
    data: XOR<OTPUpdateInput, OTPUncheckedUpdateInput>
    /**
     * Choose, which OTP to update.
     */
    where: OTPWhereUniqueInput
  }

  /**
   * OTP updateMany
   */
  export type OTPUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OTPS.
     */
    data: XOR<OTPUpdateManyMutationInput, OTPUncheckedUpdateManyInput>
    /**
     * Filter which OTPS to update
     */
    where?: OTPWhereInput
    /**
     * Limit how many OTPS to update.
     */
    limit?: number
  }

  /**
   * OTP updateManyAndReturn
   */
  export type OTPUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OTP
     */
    select?: OTPSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OTP
     */
    omit?: OTPOmit<ExtArgs> | null
    /**
     * The data used to update OTPS.
     */
    data: XOR<OTPUpdateManyMutationInput, OTPUncheckedUpdateManyInput>
    /**
     * Filter which OTPS to update
     */
    where?: OTPWhereInput
    /**
     * Limit how many OTPS to update.
     */
    limit?: number
  }

  /**
   * OTP upsert
   */
  export type OTPUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OTP
     */
    select?: OTPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OTP
     */
    omit?: OTPOmit<ExtArgs> | null
    /**
     * The filter to search for the OTP to update in case it exists.
     */
    where: OTPWhereUniqueInput
    /**
     * In case the OTP found by the `where` argument doesn't exist, create a new OTP with this data.
     */
    create: XOR<OTPCreateInput, OTPUncheckedCreateInput>
    /**
     * In case the OTP was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OTPUpdateInput, OTPUncheckedUpdateInput>
  }

  /**
   * OTP delete
   */
  export type OTPDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OTP
     */
    select?: OTPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OTP
     */
    omit?: OTPOmit<ExtArgs> | null
    /**
     * Filter which OTP to delete.
     */
    where: OTPWhereUniqueInput
  }

  /**
   * OTP deleteMany
   */
  export type OTPDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OTPS to delete
     */
    where?: OTPWhereInput
    /**
     * Limit how many OTPS to delete.
     */
    limit?: number
  }

  /**
   * OTP without action
   */
  export type OTPDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OTP
     */
    select?: OTPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OTP
     */
    omit?: OTPOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    phoneNumber: 'phoneNumber',
    countryCode: 'countryCode',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ProfileScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    jobRoleId: 'jobRoleId',
    fullName: 'fullName',
    email: 'email',
    bio: 'bio',
    location: 'location',
    expectedSalary: 'expectedSalary',
    yearsOfExperience: 'yearsOfExperience',
    availableToStart: 'availableToStart',
    immediateJoiner: 'immediateJoiner',
    preferredRole: 'preferredRole',
    profilePicture: 'profilePicture',
    cvLink: 'cvLink',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProfileScalarFieldEnum = (typeof ProfileScalarFieldEnum)[keyof typeof ProfileScalarFieldEnum]


  export const RecruiterProfileScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    fullName: 'fullName',
    companyId: 'companyId',
    jobRoleId: 'jobRoleId',
    workEmail: 'workEmail',
    location: 'location',
    isVerified: 'isVerified',
    recruiterVerificationMethodsId: 'recruiterVerificationMethodsId',
    verifiedBy: 'verifiedBy',
    verificationDetails: 'verificationDetails',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RecruiterProfileScalarFieldEnum = (typeof RecruiterProfileScalarFieldEnum)[keyof typeof RecruiterProfileScalarFieldEnum]


  export const RecruiterVerificationMethodsScalarFieldEnum: {
    id: 'id',
    method: 'method'
  };

  export type RecruiterVerificationMethodsScalarFieldEnum = (typeof RecruiterVerificationMethodsScalarFieldEnum)[keyof typeof RecruiterVerificationMethodsScalarFieldEnum]


  export const SavedJobScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    jobId: 'jobId',
    createdAt: 'createdAt'
  };

  export type SavedJobScalarFieldEnum = (typeof SavedJobScalarFieldEnum)[keyof typeof SavedJobScalarFieldEnum]


  export const SkillUserMapScalarFieldEnum: {
    id: 'id',
    skillId: 'skillId',
    profileId: 'profileId',
    createdAt: 'createdAt'
  };

  export type SkillUserMapScalarFieldEnum = (typeof SkillUserMapScalarFieldEnum)[keyof typeof SkillUserMapScalarFieldEnum]


  export const EducationScalarFieldEnum: {
    id: 'id',
    profileId: 'profileId',
    degree: 'degree',
    institution: 'institution',
    location: 'location',
    startDate: 'startDate',
    endDate: 'endDate',
    grade: 'grade',
    description: 'description',
    isCurrent: 'isCurrent'
  };

  export type EducationScalarFieldEnum = (typeof EducationScalarFieldEnum)[keyof typeof EducationScalarFieldEnum]


  export const ExperienceScalarFieldEnum: {
    id: 'id',
    profileId: 'profileId',
    jobRoleId: 'jobRoleId',
    companyId: 'companyId',
    location: 'location',
    startDate: 'startDate',
    endDate: 'endDate',
    isCurrent: 'isCurrent',
    rolesAndResponsibilities: 'rolesAndResponsibilities'
  };

  export type ExperienceScalarFieldEnum = (typeof ExperienceScalarFieldEnum)[keyof typeof ExperienceScalarFieldEnum]


  export const ResumeScalarFieldEnum: {
    id: 'id',
    profileId: 'profileId',
    title: 'title',
    fileName: 'fileName',
    fileUrl: 'fileUrl',
    fileSize: 'fileSize',
    mimeType: 'mimeType',
    isDefault: 'isDefault',
    isActive: 'isActive',
    uploadedAt: 'uploadedAt',
    updatedAt: 'updatedAt'
  };

  export type ResumeScalarFieldEnum = (typeof ResumeScalarFieldEnum)[keyof typeof ResumeScalarFieldEnum]


  export const NotificationPreferencesScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    jobMatches: 'jobMatches',
    applications: 'applications',
    interviews: 'interviews',
    messages: 'messages',
    emailEnabled: 'emailEnabled',
    pushEnabled: 'pushEnabled',
    quietHours: 'quietHours',
    frequency: 'frequency',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type NotificationPreferencesScalarFieldEnum = (typeof NotificationPreferencesScalarFieldEnum)[keyof typeof NotificationPreferencesScalarFieldEnum]


  export const JobSearchPreferencesScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    desiredJobTypes: 'desiredJobTypes',
    minSalary: 'minSalary',
    maxSalary: 'maxSalary',
    salaryCurrency: 'salaryCurrency',
    salaryPeriod: 'salaryPeriod',
    desiredLocations: 'desiredLocations',
    isRemoteOnly: 'isRemoteOnly',
    isWillingToRelocate: 'isWillingToRelocate',
    maxCommuteMiles: 'maxCommuteMiles',
    desiredRoles: 'desiredRoles',
    desiredSkills: 'desiredSkills',
    yearsOfExperience: 'yearsOfExperience',
    desiredIndustries: 'desiredIndustries',
    minCompanySize: 'minCompanySize',
    maxCompanySize: 'maxCompanySize',
    excludedCompanies: 'excludedCompanies',
    isSearchActive: 'isSearchActive',
    lastSearchDate: 'lastSearchDate',
    savedSearches: 'savedSearches',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type JobSearchPreferencesScalarFieldEnum = (typeof JobSearchPreferencesScalarFieldEnum)[keyof typeof JobSearchPreferencesScalarFieldEnum]


  export const FCMTokenScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    token: 'token',
    platform: 'platform',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type FCMTokenScalarFieldEnum = (typeof FCMTokenScalarFieldEnum)[keyof typeof FCMTokenScalarFieldEnum]


  export const OTPScalarFieldEnum: {
    id: 'id',
    phoneNumber: 'phoneNumber',
    countryCode: 'countryCode',
    otp: 'otp',
    expiresAt: 'expiresAt',
    attempts: 'attempts',
    userId: 'userId',
    verified: 'verified',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type OTPScalarFieldEnum = (typeof OTPScalarFieldEnum)[keyof typeof OTPScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    phoneNumber?: StringFilter<"User"> | string
    countryCode?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    profiles?: ProfileListRelationFilter
    savedJobs?: SavedJobListRelationFilter
    jobSearchPreferences?: XOR<JobSearchPreferencesNullableScalarRelationFilter, JobSearchPreferencesWhereInput> | null
    notificationPreferences?: XOR<NotificationPreferencesNullableScalarRelationFilter, NotificationPreferencesWhereInput> | null
    fcmTokens?: FCMTokenListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    phoneNumber?: SortOrder
    countryCode?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    profiles?: ProfileOrderByRelationAggregateInput
    savedJobs?: SavedJobOrderByRelationAggregateInput
    jobSearchPreferences?: JobSearchPreferencesOrderByWithRelationInput
    notificationPreferences?: NotificationPreferencesOrderByWithRelationInput
    fcmTokens?: FCMTokenOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    phoneNumber_countryCode?: UserPhoneNumberCountryCodeCompoundUniqueInput
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    phoneNumber?: StringFilter<"User"> | string
    countryCode?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    profiles?: ProfileListRelationFilter
    savedJobs?: SavedJobListRelationFilter
    jobSearchPreferences?: XOR<JobSearchPreferencesNullableScalarRelationFilter, JobSearchPreferencesWhereInput> | null
    notificationPreferences?: XOR<NotificationPreferencesNullableScalarRelationFilter, NotificationPreferencesWhereInput> | null
    fcmTokens?: FCMTokenListRelationFilter
  }, "id" | "phoneNumber_countryCode">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    phoneNumber?: SortOrder
    countryCode?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    phoneNumber?: StringWithAggregatesFilter<"User"> | string
    countryCode?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type ProfileWhereInput = {
    AND?: ProfileWhereInput | ProfileWhereInput[]
    OR?: ProfileWhereInput[]
    NOT?: ProfileWhereInput | ProfileWhereInput[]
    id?: StringFilter<"Profile"> | string
    userId?: StringFilter<"Profile"> | string
    jobRoleId?: StringNullableFilter<"Profile"> | string | null
    fullName?: StringNullableFilter<"Profile"> | string | null
    email?: StringNullableFilter<"Profile"> | string | null
    bio?: StringNullableFilter<"Profile"> | string | null
    location?: StringNullableFilter<"Profile"> | string | null
    expectedSalary?: StringNullableFilter<"Profile"> | string | null
    yearsOfExperience?: StringNullableFilter<"Profile"> | string | null
    availableToStart?: StringNullableFilter<"Profile"> | string | null
    immediateJoiner?: BoolNullableFilter<"Profile"> | boolean | null
    preferredRole?: StringNullableFilter<"Profile"> | string | null
    profilePicture?: StringNullableFilter<"Profile"> | string | null
    cvLink?: StringNullableFilter<"Profile"> | string | null
    createdAt?: DateTimeFilter<"Profile"> | Date | string
    updatedAt?: DateTimeFilter<"Profile"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    education?: EducationListRelationFilter
    experience?: ExperienceListRelationFilter
    skillUserMap?: SkillUserMapListRelationFilter
    resumes?: ResumeListRelationFilter
  }

  export type ProfileOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    jobRoleId?: SortOrderInput | SortOrder
    fullName?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    expectedSalary?: SortOrderInput | SortOrder
    yearsOfExperience?: SortOrderInput | SortOrder
    availableToStart?: SortOrderInput | SortOrder
    immediateJoiner?: SortOrderInput | SortOrder
    preferredRole?: SortOrderInput | SortOrder
    profilePicture?: SortOrderInput | SortOrder
    cvLink?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    education?: EducationOrderByRelationAggregateInput
    experience?: ExperienceOrderByRelationAggregateInput
    skillUserMap?: SkillUserMapOrderByRelationAggregateInput
    resumes?: ResumeOrderByRelationAggregateInput
  }

  export type ProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: ProfileWhereInput | ProfileWhereInput[]
    OR?: ProfileWhereInput[]
    NOT?: ProfileWhereInput | ProfileWhereInput[]
    userId?: StringFilter<"Profile"> | string
    jobRoleId?: StringNullableFilter<"Profile"> | string | null
    fullName?: StringNullableFilter<"Profile"> | string | null
    bio?: StringNullableFilter<"Profile"> | string | null
    location?: StringNullableFilter<"Profile"> | string | null
    expectedSalary?: StringNullableFilter<"Profile"> | string | null
    yearsOfExperience?: StringNullableFilter<"Profile"> | string | null
    availableToStart?: StringNullableFilter<"Profile"> | string | null
    immediateJoiner?: BoolNullableFilter<"Profile"> | boolean | null
    preferredRole?: StringNullableFilter<"Profile"> | string | null
    profilePicture?: StringNullableFilter<"Profile"> | string | null
    cvLink?: StringNullableFilter<"Profile"> | string | null
    createdAt?: DateTimeFilter<"Profile"> | Date | string
    updatedAt?: DateTimeFilter<"Profile"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    education?: EducationListRelationFilter
    experience?: ExperienceListRelationFilter
    skillUserMap?: SkillUserMapListRelationFilter
    resumes?: ResumeListRelationFilter
  }, "id" | "email">

  export type ProfileOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    jobRoleId?: SortOrderInput | SortOrder
    fullName?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    expectedSalary?: SortOrderInput | SortOrder
    yearsOfExperience?: SortOrderInput | SortOrder
    availableToStart?: SortOrderInput | SortOrder
    immediateJoiner?: SortOrderInput | SortOrder
    preferredRole?: SortOrderInput | SortOrder
    profilePicture?: SortOrderInput | SortOrder
    cvLink?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProfileCountOrderByAggregateInput
    _max?: ProfileMaxOrderByAggregateInput
    _min?: ProfileMinOrderByAggregateInput
  }

  export type ProfileScalarWhereWithAggregatesInput = {
    AND?: ProfileScalarWhereWithAggregatesInput | ProfileScalarWhereWithAggregatesInput[]
    OR?: ProfileScalarWhereWithAggregatesInput[]
    NOT?: ProfileScalarWhereWithAggregatesInput | ProfileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Profile"> | string
    userId?: StringWithAggregatesFilter<"Profile"> | string
    jobRoleId?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    fullName?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    email?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    bio?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    location?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    expectedSalary?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    yearsOfExperience?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    availableToStart?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    immediateJoiner?: BoolNullableWithAggregatesFilter<"Profile"> | boolean | null
    preferredRole?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    profilePicture?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    cvLink?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Profile"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Profile"> | Date | string
  }

  export type RecruiterProfileWhereInput = {
    AND?: RecruiterProfileWhereInput | RecruiterProfileWhereInput[]
    OR?: RecruiterProfileWhereInput[]
    NOT?: RecruiterProfileWhereInput | RecruiterProfileWhereInput[]
    id?: StringFilter<"RecruiterProfile"> | string
    userId?: StringFilter<"RecruiterProfile"> | string
    fullName?: StringNullableFilter<"RecruiterProfile"> | string | null
    companyId?: StringNullableFilter<"RecruiterProfile"> | string | null
    jobRoleId?: StringNullableFilter<"RecruiterProfile"> | string | null
    workEmail?: StringNullableFilter<"RecruiterProfile"> | string | null
    location?: StringNullableFilter<"RecruiterProfile"> | string | null
    isVerified?: BoolFilter<"RecruiterProfile"> | boolean
    recruiterVerificationMethodsId?: StringNullableFilter<"RecruiterProfile"> | string | null
    verifiedBy?: StringNullableFilter<"RecruiterProfile"> | string | null
    verificationDetails?: StringNullableFilter<"RecruiterProfile"> | string | null
    createdAt?: DateTimeFilter<"RecruiterProfile"> | Date | string
    updatedAt?: DateTimeFilter<"RecruiterProfile"> | Date | string
    recruiterVerificationMethods?: XOR<RecruiterVerificationMethodsNullableScalarRelationFilter, RecruiterVerificationMethodsWhereInput> | null
  }

  export type RecruiterProfileOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    fullName?: SortOrderInput | SortOrder
    companyId?: SortOrderInput | SortOrder
    jobRoleId?: SortOrderInput | SortOrder
    workEmail?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    isVerified?: SortOrder
    recruiterVerificationMethodsId?: SortOrderInput | SortOrder
    verifiedBy?: SortOrderInput | SortOrder
    verificationDetails?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    recruiterVerificationMethods?: RecruiterVerificationMethodsOrderByWithRelationInput
  }

  export type RecruiterProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: RecruiterProfileWhereInput | RecruiterProfileWhereInput[]
    OR?: RecruiterProfileWhereInput[]
    NOT?: RecruiterProfileWhereInput | RecruiterProfileWhereInput[]
    fullName?: StringNullableFilter<"RecruiterProfile"> | string | null
    companyId?: StringNullableFilter<"RecruiterProfile"> | string | null
    jobRoleId?: StringNullableFilter<"RecruiterProfile"> | string | null
    workEmail?: StringNullableFilter<"RecruiterProfile"> | string | null
    location?: StringNullableFilter<"RecruiterProfile"> | string | null
    isVerified?: BoolFilter<"RecruiterProfile"> | boolean
    recruiterVerificationMethodsId?: StringNullableFilter<"RecruiterProfile"> | string | null
    verifiedBy?: StringNullableFilter<"RecruiterProfile"> | string | null
    verificationDetails?: StringNullableFilter<"RecruiterProfile"> | string | null
    createdAt?: DateTimeFilter<"RecruiterProfile"> | Date | string
    updatedAt?: DateTimeFilter<"RecruiterProfile"> | Date | string
    recruiterVerificationMethods?: XOR<RecruiterVerificationMethodsNullableScalarRelationFilter, RecruiterVerificationMethodsWhereInput> | null
  }, "id" | "userId">

  export type RecruiterProfileOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    fullName?: SortOrderInput | SortOrder
    companyId?: SortOrderInput | SortOrder
    jobRoleId?: SortOrderInput | SortOrder
    workEmail?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    isVerified?: SortOrder
    recruiterVerificationMethodsId?: SortOrderInput | SortOrder
    verifiedBy?: SortOrderInput | SortOrder
    verificationDetails?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RecruiterProfileCountOrderByAggregateInput
    _max?: RecruiterProfileMaxOrderByAggregateInput
    _min?: RecruiterProfileMinOrderByAggregateInput
  }

  export type RecruiterProfileScalarWhereWithAggregatesInput = {
    AND?: RecruiterProfileScalarWhereWithAggregatesInput | RecruiterProfileScalarWhereWithAggregatesInput[]
    OR?: RecruiterProfileScalarWhereWithAggregatesInput[]
    NOT?: RecruiterProfileScalarWhereWithAggregatesInput | RecruiterProfileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RecruiterProfile"> | string
    userId?: StringWithAggregatesFilter<"RecruiterProfile"> | string
    fullName?: StringNullableWithAggregatesFilter<"RecruiterProfile"> | string | null
    companyId?: StringNullableWithAggregatesFilter<"RecruiterProfile"> | string | null
    jobRoleId?: StringNullableWithAggregatesFilter<"RecruiterProfile"> | string | null
    workEmail?: StringNullableWithAggregatesFilter<"RecruiterProfile"> | string | null
    location?: StringNullableWithAggregatesFilter<"RecruiterProfile"> | string | null
    isVerified?: BoolWithAggregatesFilter<"RecruiterProfile"> | boolean
    recruiterVerificationMethodsId?: StringNullableWithAggregatesFilter<"RecruiterProfile"> | string | null
    verifiedBy?: StringNullableWithAggregatesFilter<"RecruiterProfile"> | string | null
    verificationDetails?: StringNullableWithAggregatesFilter<"RecruiterProfile"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"RecruiterProfile"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"RecruiterProfile"> | Date | string
  }

  export type RecruiterVerificationMethodsWhereInput = {
    AND?: RecruiterVerificationMethodsWhereInput | RecruiterVerificationMethodsWhereInput[]
    OR?: RecruiterVerificationMethodsWhereInput[]
    NOT?: RecruiterVerificationMethodsWhereInput | RecruiterVerificationMethodsWhereInput[]
    id?: StringFilter<"RecruiterVerificationMethods"> | string
    method?: StringFilter<"RecruiterVerificationMethods"> | string
    RecruiterProfile?: RecruiterProfileListRelationFilter
  }

  export type RecruiterVerificationMethodsOrderByWithRelationInput = {
    id?: SortOrder
    method?: SortOrder
    RecruiterProfile?: RecruiterProfileOrderByRelationAggregateInput
  }

  export type RecruiterVerificationMethodsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RecruiterVerificationMethodsWhereInput | RecruiterVerificationMethodsWhereInput[]
    OR?: RecruiterVerificationMethodsWhereInput[]
    NOT?: RecruiterVerificationMethodsWhereInput | RecruiterVerificationMethodsWhereInput[]
    method?: StringFilter<"RecruiterVerificationMethods"> | string
    RecruiterProfile?: RecruiterProfileListRelationFilter
  }, "id">

  export type RecruiterVerificationMethodsOrderByWithAggregationInput = {
    id?: SortOrder
    method?: SortOrder
    _count?: RecruiterVerificationMethodsCountOrderByAggregateInput
    _max?: RecruiterVerificationMethodsMaxOrderByAggregateInput
    _min?: RecruiterVerificationMethodsMinOrderByAggregateInput
  }

  export type RecruiterVerificationMethodsScalarWhereWithAggregatesInput = {
    AND?: RecruiterVerificationMethodsScalarWhereWithAggregatesInput | RecruiterVerificationMethodsScalarWhereWithAggregatesInput[]
    OR?: RecruiterVerificationMethodsScalarWhereWithAggregatesInput[]
    NOT?: RecruiterVerificationMethodsScalarWhereWithAggregatesInput | RecruiterVerificationMethodsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RecruiterVerificationMethods"> | string
    method?: StringWithAggregatesFilter<"RecruiterVerificationMethods"> | string
  }

  export type SavedJobWhereInput = {
    AND?: SavedJobWhereInput | SavedJobWhereInput[]
    OR?: SavedJobWhereInput[]
    NOT?: SavedJobWhereInput | SavedJobWhereInput[]
    id?: StringFilter<"SavedJob"> | string
    userId?: StringFilter<"SavedJob"> | string
    jobId?: StringFilter<"SavedJob"> | string
    createdAt?: DateTimeFilter<"SavedJob"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SavedJobOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    jobId?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SavedJobWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_jobId?: SavedJobUserIdJobIdCompoundUniqueInput
    AND?: SavedJobWhereInput | SavedJobWhereInput[]
    OR?: SavedJobWhereInput[]
    NOT?: SavedJobWhereInput | SavedJobWhereInput[]
    userId?: StringFilter<"SavedJob"> | string
    jobId?: StringFilter<"SavedJob"> | string
    createdAt?: DateTimeFilter<"SavedJob"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId_jobId">

  export type SavedJobOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    jobId?: SortOrder
    createdAt?: SortOrder
    _count?: SavedJobCountOrderByAggregateInput
    _max?: SavedJobMaxOrderByAggregateInput
    _min?: SavedJobMinOrderByAggregateInput
  }

  export type SavedJobScalarWhereWithAggregatesInput = {
    AND?: SavedJobScalarWhereWithAggregatesInput | SavedJobScalarWhereWithAggregatesInput[]
    OR?: SavedJobScalarWhereWithAggregatesInput[]
    NOT?: SavedJobScalarWhereWithAggregatesInput | SavedJobScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SavedJob"> | string
    userId?: StringWithAggregatesFilter<"SavedJob"> | string
    jobId?: StringWithAggregatesFilter<"SavedJob"> | string
    createdAt?: DateTimeWithAggregatesFilter<"SavedJob"> | Date | string
  }

  export type SkillUserMapWhereInput = {
    AND?: SkillUserMapWhereInput | SkillUserMapWhereInput[]
    OR?: SkillUserMapWhereInput[]
    NOT?: SkillUserMapWhereInput | SkillUserMapWhereInput[]
    id?: StringFilter<"SkillUserMap"> | string
    skillId?: StringFilter<"SkillUserMap"> | string
    profileId?: StringFilter<"SkillUserMap"> | string
    createdAt?: DateTimeFilter<"SkillUserMap"> | Date | string
    profile?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
  }

  export type SkillUserMapOrderByWithRelationInput = {
    id?: SortOrder
    skillId?: SortOrder
    profileId?: SortOrder
    createdAt?: SortOrder
    profile?: ProfileOrderByWithRelationInput
  }

  export type SkillUserMapWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    skillId_profileId?: SkillUserMapSkillIdProfileIdCompoundUniqueInput
    AND?: SkillUserMapWhereInput | SkillUserMapWhereInput[]
    OR?: SkillUserMapWhereInput[]
    NOT?: SkillUserMapWhereInput | SkillUserMapWhereInput[]
    skillId?: StringFilter<"SkillUserMap"> | string
    profileId?: StringFilter<"SkillUserMap"> | string
    createdAt?: DateTimeFilter<"SkillUserMap"> | Date | string
    profile?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
  }, "id" | "skillId_profileId">

  export type SkillUserMapOrderByWithAggregationInput = {
    id?: SortOrder
    skillId?: SortOrder
    profileId?: SortOrder
    createdAt?: SortOrder
    _count?: SkillUserMapCountOrderByAggregateInput
    _max?: SkillUserMapMaxOrderByAggregateInput
    _min?: SkillUserMapMinOrderByAggregateInput
  }

  export type SkillUserMapScalarWhereWithAggregatesInput = {
    AND?: SkillUserMapScalarWhereWithAggregatesInput | SkillUserMapScalarWhereWithAggregatesInput[]
    OR?: SkillUserMapScalarWhereWithAggregatesInput[]
    NOT?: SkillUserMapScalarWhereWithAggregatesInput | SkillUserMapScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SkillUserMap"> | string
    skillId?: StringWithAggregatesFilter<"SkillUserMap"> | string
    profileId?: StringWithAggregatesFilter<"SkillUserMap"> | string
    createdAt?: DateTimeWithAggregatesFilter<"SkillUserMap"> | Date | string
  }

  export type EducationWhereInput = {
    AND?: EducationWhereInput | EducationWhereInput[]
    OR?: EducationWhereInput[]
    NOT?: EducationWhereInput | EducationWhereInput[]
    id?: StringFilter<"Education"> | string
    profileId?: StringFilter<"Education"> | string
    degree?: StringFilter<"Education"> | string
    institution?: StringFilter<"Education"> | string
    location?: StringNullableFilter<"Education"> | string | null
    startDate?: StringFilter<"Education"> | string
    endDate?: StringNullableFilter<"Education"> | string | null
    grade?: StringNullableFilter<"Education"> | string | null
    description?: StringNullableFilter<"Education"> | string | null
    isCurrent?: BoolFilter<"Education"> | boolean
    profile?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
  }

  export type EducationOrderByWithRelationInput = {
    id?: SortOrder
    profileId?: SortOrder
    degree?: SortOrder
    institution?: SortOrder
    location?: SortOrderInput | SortOrder
    startDate?: SortOrder
    endDate?: SortOrderInput | SortOrder
    grade?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    isCurrent?: SortOrder
    profile?: ProfileOrderByWithRelationInput
  }

  export type EducationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EducationWhereInput | EducationWhereInput[]
    OR?: EducationWhereInput[]
    NOT?: EducationWhereInput | EducationWhereInput[]
    profileId?: StringFilter<"Education"> | string
    degree?: StringFilter<"Education"> | string
    institution?: StringFilter<"Education"> | string
    location?: StringNullableFilter<"Education"> | string | null
    startDate?: StringFilter<"Education"> | string
    endDate?: StringNullableFilter<"Education"> | string | null
    grade?: StringNullableFilter<"Education"> | string | null
    description?: StringNullableFilter<"Education"> | string | null
    isCurrent?: BoolFilter<"Education"> | boolean
    profile?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
  }, "id">

  export type EducationOrderByWithAggregationInput = {
    id?: SortOrder
    profileId?: SortOrder
    degree?: SortOrder
    institution?: SortOrder
    location?: SortOrderInput | SortOrder
    startDate?: SortOrder
    endDate?: SortOrderInput | SortOrder
    grade?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    isCurrent?: SortOrder
    _count?: EducationCountOrderByAggregateInput
    _max?: EducationMaxOrderByAggregateInput
    _min?: EducationMinOrderByAggregateInput
  }

  export type EducationScalarWhereWithAggregatesInput = {
    AND?: EducationScalarWhereWithAggregatesInput | EducationScalarWhereWithAggregatesInput[]
    OR?: EducationScalarWhereWithAggregatesInput[]
    NOT?: EducationScalarWhereWithAggregatesInput | EducationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Education"> | string
    profileId?: StringWithAggregatesFilter<"Education"> | string
    degree?: StringWithAggregatesFilter<"Education"> | string
    institution?: StringWithAggregatesFilter<"Education"> | string
    location?: StringNullableWithAggregatesFilter<"Education"> | string | null
    startDate?: StringWithAggregatesFilter<"Education"> | string
    endDate?: StringNullableWithAggregatesFilter<"Education"> | string | null
    grade?: StringNullableWithAggregatesFilter<"Education"> | string | null
    description?: StringNullableWithAggregatesFilter<"Education"> | string | null
    isCurrent?: BoolWithAggregatesFilter<"Education"> | boolean
  }

  export type ExperienceWhereInput = {
    AND?: ExperienceWhereInput | ExperienceWhereInput[]
    OR?: ExperienceWhereInput[]
    NOT?: ExperienceWhereInput | ExperienceWhereInput[]
    id?: StringFilter<"Experience"> | string
    profileId?: StringFilter<"Experience"> | string
    jobRoleId?: StringNullableFilter<"Experience"> | string | null
    companyId?: StringFilter<"Experience"> | string
    location?: StringNullableFilter<"Experience"> | string | null
    startDate?: StringFilter<"Experience"> | string
    endDate?: StringNullableFilter<"Experience"> | string | null
    isCurrent?: BoolFilter<"Experience"> | boolean
    rolesAndResponsibilities?: StringNullableFilter<"Experience"> | string | null
    profile?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
  }

  export type ExperienceOrderByWithRelationInput = {
    id?: SortOrder
    profileId?: SortOrder
    jobRoleId?: SortOrderInput | SortOrder
    companyId?: SortOrder
    location?: SortOrderInput | SortOrder
    startDate?: SortOrder
    endDate?: SortOrderInput | SortOrder
    isCurrent?: SortOrder
    rolesAndResponsibilities?: SortOrderInput | SortOrder
    profile?: ProfileOrderByWithRelationInput
  }

  export type ExperienceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ExperienceWhereInput | ExperienceWhereInput[]
    OR?: ExperienceWhereInput[]
    NOT?: ExperienceWhereInput | ExperienceWhereInput[]
    profileId?: StringFilter<"Experience"> | string
    jobRoleId?: StringNullableFilter<"Experience"> | string | null
    companyId?: StringFilter<"Experience"> | string
    location?: StringNullableFilter<"Experience"> | string | null
    startDate?: StringFilter<"Experience"> | string
    endDate?: StringNullableFilter<"Experience"> | string | null
    isCurrent?: BoolFilter<"Experience"> | boolean
    rolesAndResponsibilities?: StringNullableFilter<"Experience"> | string | null
    profile?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
  }, "id">

  export type ExperienceOrderByWithAggregationInput = {
    id?: SortOrder
    profileId?: SortOrder
    jobRoleId?: SortOrderInput | SortOrder
    companyId?: SortOrder
    location?: SortOrderInput | SortOrder
    startDate?: SortOrder
    endDate?: SortOrderInput | SortOrder
    isCurrent?: SortOrder
    rolesAndResponsibilities?: SortOrderInput | SortOrder
    _count?: ExperienceCountOrderByAggregateInput
    _max?: ExperienceMaxOrderByAggregateInput
    _min?: ExperienceMinOrderByAggregateInput
  }

  export type ExperienceScalarWhereWithAggregatesInput = {
    AND?: ExperienceScalarWhereWithAggregatesInput | ExperienceScalarWhereWithAggregatesInput[]
    OR?: ExperienceScalarWhereWithAggregatesInput[]
    NOT?: ExperienceScalarWhereWithAggregatesInput | ExperienceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Experience"> | string
    profileId?: StringWithAggregatesFilter<"Experience"> | string
    jobRoleId?: StringNullableWithAggregatesFilter<"Experience"> | string | null
    companyId?: StringWithAggregatesFilter<"Experience"> | string
    location?: StringNullableWithAggregatesFilter<"Experience"> | string | null
    startDate?: StringWithAggregatesFilter<"Experience"> | string
    endDate?: StringNullableWithAggregatesFilter<"Experience"> | string | null
    isCurrent?: BoolWithAggregatesFilter<"Experience"> | boolean
    rolesAndResponsibilities?: StringNullableWithAggregatesFilter<"Experience"> | string | null
  }

  export type ResumeWhereInput = {
    AND?: ResumeWhereInput | ResumeWhereInput[]
    OR?: ResumeWhereInput[]
    NOT?: ResumeWhereInput | ResumeWhereInput[]
    id?: StringFilter<"Resume"> | string
    profileId?: StringFilter<"Resume"> | string
    title?: StringFilter<"Resume"> | string
    fileName?: StringFilter<"Resume"> | string
    fileUrl?: StringFilter<"Resume"> | string
    fileSize?: IntNullableFilter<"Resume"> | number | null
    mimeType?: StringFilter<"Resume"> | string
    isDefault?: BoolFilter<"Resume"> | boolean
    isActive?: BoolFilter<"Resume"> | boolean
    uploadedAt?: DateTimeFilter<"Resume"> | Date | string
    updatedAt?: DateTimeFilter<"Resume"> | Date | string
    profile?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
  }

  export type ResumeOrderByWithRelationInput = {
    id?: SortOrder
    profileId?: SortOrder
    title?: SortOrder
    fileName?: SortOrder
    fileUrl?: SortOrder
    fileSize?: SortOrderInput | SortOrder
    mimeType?: SortOrder
    isDefault?: SortOrder
    isActive?: SortOrder
    uploadedAt?: SortOrder
    updatedAt?: SortOrder
    profile?: ProfileOrderByWithRelationInput
  }

  export type ResumeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ResumeWhereInput | ResumeWhereInput[]
    OR?: ResumeWhereInput[]
    NOT?: ResumeWhereInput | ResumeWhereInput[]
    profileId?: StringFilter<"Resume"> | string
    title?: StringFilter<"Resume"> | string
    fileName?: StringFilter<"Resume"> | string
    fileUrl?: StringFilter<"Resume"> | string
    fileSize?: IntNullableFilter<"Resume"> | number | null
    mimeType?: StringFilter<"Resume"> | string
    isDefault?: BoolFilter<"Resume"> | boolean
    isActive?: BoolFilter<"Resume"> | boolean
    uploadedAt?: DateTimeFilter<"Resume"> | Date | string
    updatedAt?: DateTimeFilter<"Resume"> | Date | string
    profile?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
  }, "id">

  export type ResumeOrderByWithAggregationInput = {
    id?: SortOrder
    profileId?: SortOrder
    title?: SortOrder
    fileName?: SortOrder
    fileUrl?: SortOrder
    fileSize?: SortOrderInput | SortOrder
    mimeType?: SortOrder
    isDefault?: SortOrder
    isActive?: SortOrder
    uploadedAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ResumeCountOrderByAggregateInput
    _avg?: ResumeAvgOrderByAggregateInput
    _max?: ResumeMaxOrderByAggregateInput
    _min?: ResumeMinOrderByAggregateInput
    _sum?: ResumeSumOrderByAggregateInput
  }

  export type ResumeScalarWhereWithAggregatesInput = {
    AND?: ResumeScalarWhereWithAggregatesInput | ResumeScalarWhereWithAggregatesInput[]
    OR?: ResumeScalarWhereWithAggregatesInput[]
    NOT?: ResumeScalarWhereWithAggregatesInput | ResumeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Resume"> | string
    profileId?: StringWithAggregatesFilter<"Resume"> | string
    title?: StringWithAggregatesFilter<"Resume"> | string
    fileName?: StringWithAggregatesFilter<"Resume"> | string
    fileUrl?: StringWithAggregatesFilter<"Resume"> | string
    fileSize?: IntNullableWithAggregatesFilter<"Resume"> | number | null
    mimeType?: StringWithAggregatesFilter<"Resume"> | string
    isDefault?: BoolWithAggregatesFilter<"Resume"> | boolean
    isActive?: BoolWithAggregatesFilter<"Resume"> | boolean
    uploadedAt?: DateTimeWithAggregatesFilter<"Resume"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Resume"> | Date | string
  }

  export type NotificationPreferencesWhereInput = {
    AND?: NotificationPreferencesWhereInput | NotificationPreferencesWhereInput[]
    OR?: NotificationPreferencesWhereInput[]
    NOT?: NotificationPreferencesWhereInput | NotificationPreferencesWhereInput[]
    id?: StringFilter<"NotificationPreferences"> | string
    userId?: StringFilter<"NotificationPreferences"> | string
    jobMatches?: BoolFilter<"NotificationPreferences"> | boolean
    applications?: BoolFilter<"NotificationPreferences"> | boolean
    interviews?: BoolFilter<"NotificationPreferences"> | boolean
    messages?: BoolFilter<"NotificationPreferences"> | boolean
    emailEnabled?: BoolFilter<"NotificationPreferences"> | boolean
    pushEnabled?: BoolFilter<"NotificationPreferences"> | boolean
    quietHours?: StringNullableFilter<"NotificationPreferences"> | string | null
    frequency?: StringFilter<"NotificationPreferences"> | string
    createdAt?: DateTimeFilter<"NotificationPreferences"> | Date | string
    updatedAt?: DateTimeFilter<"NotificationPreferences"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type NotificationPreferencesOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    jobMatches?: SortOrder
    applications?: SortOrder
    interviews?: SortOrder
    messages?: SortOrder
    emailEnabled?: SortOrder
    pushEnabled?: SortOrder
    quietHours?: SortOrderInput | SortOrder
    frequency?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type NotificationPreferencesWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: NotificationPreferencesWhereInput | NotificationPreferencesWhereInput[]
    OR?: NotificationPreferencesWhereInput[]
    NOT?: NotificationPreferencesWhereInput | NotificationPreferencesWhereInput[]
    jobMatches?: BoolFilter<"NotificationPreferences"> | boolean
    applications?: BoolFilter<"NotificationPreferences"> | boolean
    interviews?: BoolFilter<"NotificationPreferences"> | boolean
    messages?: BoolFilter<"NotificationPreferences"> | boolean
    emailEnabled?: BoolFilter<"NotificationPreferences"> | boolean
    pushEnabled?: BoolFilter<"NotificationPreferences"> | boolean
    quietHours?: StringNullableFilter<"NotificationPreferences"> | string | null
    frequency?: StringFilter<"NotificationPreferences"> | string
    createdAt?: DateTimeFilter<"NotificationPreferences"> | Date | string
    updatedAt?: DateTimeFilter<"NotificationPreferences"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId">

  export type NotificationPreferencesOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    jobMatches?: SortOrder
    applications?: SortOrder
    interviews?: SortOrder
    messages?: SortOrder
    emailEnabled?: SortOrder
    pushEnabled?: SortOrder
    quietHours?: SortOrderInput | SortOrder
    frequency?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: NotificationPreferencesCountOrderByAggregateInput
    _max?: NotificationPreferencesMaxOrderByAggregateInput
    _min?: NotificationPreferencesMinOrderByAggregateInput
  }

  export type NotificationPreferencesScalarWhereWithAggregatesInput = {
    AND?: NotificationPreferencesScalarWhereWithAggregatesInput | NotificationPreferencesScalarWhereWithAggregatesInput[]
    OR?: NotificationPreferencesScalarWhereWithAggregatesInput[]
    NOT?: NotificationPreferencesScalarWhereWithAggregatesInput | NotificationPreferencesScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"NotificationPreferences"> | string
    userId?: StringWithAggregatesFilter<"NotificationPreferences"> | string
    jobMatches?: BoolWithAggregatesFilter<"NotificationPreferences"> | boolean
    applications?: BoolWithAggregatesFilter<"NotificationPreferences"> | boolean
    interviews?: BoolWithAggregatesFilter<"NotificationPreferences"> | boolean
    messages?: BoolWithAggregatesFilter<"NotificationPreferences"> | boolean
    emailEnabled?: BoolWithAggregatesFilter<"NotificationPreferences"> | boolean
    pushEnabled?: BoolWithAggregatesFilter<"NotificationPreferences"> | boolean
    quietHours?: StringNullableWithAggregatesFilter<"NotificationPreferences"> | string | null
    frequency?: StringWithAggregatesFilter<"NotificationPreferences"> | string
    createdAt?: DateTimeWithAggregatesFilter<"NotificationPreferences"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"NotificationPreferences"> | Date | string
  }

  export type JobSearchPreferencesWhereInput = {
    AND?: JobSearchPreferencesWhereInput | JobSearchPreferencesWhereInput[]
    OR?: JobSearchPreferencesWhereInput[]
    NOT?: JobSearchPreferencesWhereInput | JobSearchPreferencesWhereInput[]
    id?: StringFilter<"JobSearchPreferences"> | string
    userId?: StringFilter<"JobSearchPreferences"> | string
    desiredJobTypes?: StringFilter<"JobSearchPreferences"> | string
    minSalary?: IntNullableFilter<"JobSearchPreferences"> | number | null
    maxSalary?: IntNullableFilter<"JobSearchPreferences"> | number | null
    salaryCurrency?: StringFilter<"JobSearchPreferences"> | string
    salaryPeriod?: StringFilter<"JobSearchPreferences"> | string
    desiredLocations?: StringNullableFilter<"JobSearchPreferences"> | string | null
    isRemoteOnly?: BoolFilter<"JobSearchPreferences"> | boolean
    isWillingToRelocate?: BoolFilter<"JobSearchPreferences"> | boolean
    maxCommuteMiles?: IntNullableFilter<"JobSearchPreferences"> | number | null
    desiredRoles?: StringFilter<"JobSearchPreferences"> | string
    desiredSkills?: StringFilter<"JobSearchPreferences"> | string
    yearsOfExperience?: StringNullableFilter<"JobSearchPreferences"> | string | null
    desiredIndustries?: StringFilter<"JobSearchPreferences"> | string
    minCompanySize?: IntNullableFilter<"JobSearchPreferences"> | number | null
    maxCompanySize?: IntNullableFilter<"JobSearchPreferences"> | number | null
    excludedCompanies?: StringFilter<"JobSearchPreferences"> | string
    isSearchActive?: BoolFilter<"JobSearchPreferences"> | boolean
    lastSearchDate?: DateTimeNullableFilter<"JobSearchPreferences"> | Date | string | null
    savedSearches?: StringNullableFilter<"JobSearchPreferences"> | string | null
    createdAt?: DateTimeFilter<"JobSearchPreferences"> | Date | string
    updatedAt?: DateTimeFilter<"JobSearchPreferences"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type JobSearchPreferencesOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    desiredJobTypes?: SortOrder
    minSalary?: SortOrderInput | SortOrder
    maxSalary?: SortOrderInput | SortOrder
    salaryCurrency?: SortOrder
    salaryPeriod?: SortOrder
    desiredLocations?: SortOrderInput | SortOrder
    isRemoteOnly?: SortOrder
    isWillingToRelocate?: SortOrder
    maxCommuteMiles?: SortOrderInput | SortOrder
    desiredRoles?: SortOrder
    desiredSkills?: SortOrder
    yearsOfExperience?: SortOrderInput | SortOrder
    desiredIndustries?: SortOrder
    minCompanySize?: SortOrderInput | SortOrder
    maxCompanySize?: SortOrderInput | SortOrder
    excludedCompanies?: SortOrder
    isSearchActive?: SortOrder
    lastSearchDate?: SortOrderInput | SortOrder
    savedSearches?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type JobSearchPreferencesWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: JobSearchPreferencesWhereInput | JobSearchPreferencesWhereInput[]
    OR?: JobSearchPreferencesWhereInput[]
    NOT?: JobSearchPreferencesWhereInput | JobSearchPreferencesWhereInput[]
    desiredJobTypes?: StringFilter<"JobSearchPreferences"> | string
    minSalary?: IntNullableFilter<"JobSearchPreferences"> | number | null
    maxSalary?: IntNullableFilter<"JobSearchPreferences"> | number | null
    salaryCurrency?: StringFilter<"JobSearchPreferences"> | string
    salaryPeriod?: StringFilter<"JobSearchPreferences"> | string
    desiredLocations?: StringNullableFilter<"JobSearchPreferences"> | string | null
    isRemoteOnly?: BoolFilter<"JobSearchPreferences"> | boolean
    isWillingToRelocate?: BoolFilter<"JobSearchPreferences"> | boolean
    maxCommuteMiles?: IntNullableFilter<"JobSearchPreferences"> | number | null
    desiredRoles?: StringFilter<"JobSearchPreferences"> | string
    desiredSkills?: StringFilter<"JobSearchPreferences"> | string
    yearsOfExperience?: StringNullableFilter<"JobSearchPreferences"> | string | null
    desiredIndustries?: StringFilter<"JobSearchPreferences"> | string
    minCompanySize?: IntNullableFilter<"JobSearchPreferences"> | number | null
    maxCompanySize?: IntNullableFilter<"JobSearchPreferences"> | number | null
    excludedCompanies?: StringFilter<"JobSearchPreferences"> | string
    isSearchActive?: BoolFilter<"JobSearchPreferences"> | boolean
    lastSearchDate?: DateTimeNullableFilter<"JobSearchPreferences"> | Date | string | null
    savedSearches?: StringNullableFilter<"JobSearchPreferences"> | string | null
    createdAt?: DateTimeFilter<"JobSearchPreferences"> | Date | string
    updatedAt?: DateTimeFilter<"JobSearchPreferences"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId">

  export type JobSearchPreferencesOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    desiredJobTypes?: SortOrder
    minSalary?: SortOrderInput | SortOrder
    maxSalary?: SortOrderInput | SortOrder
    salaryCurrency?: SortOrder
    salaryPeriod?: SortOrder
    desiredLocations?: SortOrderInput | SortOrder
    isRemoteOnly?: SortOrder
    isWillingToRelocate?: SortOrder
    maxCommuteMiles?: SortOrderInput | SortOrder
    desiredRoles?: SortOrder
    desiredSkills?: SortOrder
    yearsOfExperience?: SortOrderInput | SortOrder
    desiredIndustries?: SortOrder
    minCompanySize?: SortOrderInput | SortOrder
    maxCompanySize?: SortOrderInput | SortOrder
    excludedCompanies?: SortOrder
    isSearchActive?: SortOrder
    lastSearchDate?: SortOrderInput | SortOrder
    savedSearches?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: JobSearchPreferencesCountOrderByAggregateInput
    _avg?: JobSearchPreferencesAvgOrderByAggregateInput
    _max?: JobSearchPreferencesMaxOrderByAggregateInput
    _min?: JobSearchPreferencesMinOrderByAggregateInput
    _sum?: JobSearchPreferencesSumOrderByAggregateInput
  }

  export type JobSearchPreferencesScalarWhereWithAggregatesInput = {
    AND?: JobSearchPreferencesScalarWhereWithAggregatesInput | JobSearchPreferencesScalarWhereWithAggregatesInput[]
    OR?: JobSearchPreferencesScalarWhereWithAggregatesInput[]
    NOT?: JobSearchPreferencesScalarWhereWithAggregatesInput | JobSearchPreferencesScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"JobSearchPreferences"> | string
    userId?: StringWithAggregatesFilter<"JobSearchPreferences"> | string
    desiredJobTypes?: StringWithAggregatesFilter<"JobSearchPreferences"> | string
    minSalary?: IntNullableWithAggregatesFilter<"JobSearchPreferences"> | number | null
    maxSalary?: IntNullableWithAggregatesFilter<"JobSearchPreferences"> | number | null
    salaryCurrency?: StringWithAggregatesFilter<"JobSearchPreferences"> | string
    salaryPeriod?: StringWithAggregatesFilter<"JobSearchPreferences"> | string
    desiredLocations?: StringNullableWithAggregatesFilter<"JobSearchPreferences"> | string | null
    isRemoteOnly?: BoolWithAggregatesFilter<"JobSearchPreferences"> | boolean
    isWillingToRelocate?: BoolWithAggregatesFilter<"JobSearchPreferences"> | boolean
    maxCommuteMiles?: IntNullableWithAggregatesFilter<"JobSearchPreferences"> | number | null
    desiredRoles?: StringWithAggregatesFilter<"JobSearchPreferences"> | string
    desiredSkills?: StringWithAggregatesFilter<"JobSearchPreferences"> | string
    yearsOfExperience?: StringNullableWithAggregatesFilter<"JobSearchPreferences"> | string | null
    desiredIndustries?: StringWithAggregatesFilter<"JobSearchPreferences"> | string
    minCompanySize?: IntNullableWithAggregatesFilter<"JobSearchPreferences"> | number | null
    maxCompanySize?: IntNullableWithAggregatesFilter<"JobSearchPreferences"> | number | null
    excludedCompanies?: StringWithAggregatesFilter<"JobSearchPreferences"> | string
    isSearchActive?: BoolWithAggregatesFilter<"JobSearchPreferences"> | boolean
    lastSearchDate?: DateTimeNullableWithAggregatesFilter<"JobSearchPreferences"> | Date | string | null
    savedSearches?: StringNullableWithAggregatesFilter<"JobSearchPreferences"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"JobSearchPreferences"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"JobSearchPreferences"> | Date | string
  }

  export type FCMTokenWhereInput = {
    AND?: FCMTokenWhereInput | FCMTokenWhereInput[]
    OR?: FCMTokenWhereInput[]
    NOT?: FCMTokenWhereInput | FCMTokenWhereInput[]
    id?: StringFilter<"FCMToken"> | string
    userId?: StringFilter<"FCMToken"> | string
    token?: StringFilter<"FCMToken"> | string
    platform?: StringFilter<"FCMToken"> | string
    createdAt?: DateTimeFilter<"FCMToken"> | Date | string
    updatedAt?: DateTimeFilter<"FCMToken"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type FCMTokenOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    platform?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type FCMTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: FCMTokenWhereInput | FCMTokenWhereInput[]
    OR?: FCMTokenWhereInput[]
    NOT?: FCMTokenWhereInput | FCMTokenWhereInput[]
    userId?: StringFilter<"FCMToken"> | string
    platform?: StringFilter<"FCMToken"> | string
    createdAt?: DateTimeFilter<"FCMToken"> | Date | string
    updatedAt?: DateTimeFilter<"FCMToken"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "token">

  export type FCMTokenOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    platform?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: FCMTokenCountOrderByAggregateInput
    _max?: FCMTokenMaxOrderByAggregateInput
    _min?: FCMTokenMinOrderByAggregateInput
  }

  export type FCMTokenScalarWhereWithAggregatesInput = {
    AND?: FCMTokenScalarWhereWithAggregatesInput | FCMTokenScalarWhereWithAggregatesInput[]
    OR?: FCMTokenScalarWhereWithAggregatesInput[]
    NOT?: FCMTokenScalarWhereWithAggregatesInput | FCMTokenScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FCMToken"> | string
    userId?: StringWithAggregatesFilter<"FCMToken"> | string
    token?: StringWithAggregatesFilter<"FCMToken"> | string
    platform?: StringWithAggregatesFilter<"FCMToken"> | string
    createdAt?: DateTimeWithAggregatesFilter<"FCMToken"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"FCMToken"> | Date | string
  }

  export type OTPWhereInput = {
    AND?: OTPWhereInput | OTPWhereInput[]
    OR?: OTPWhereInput[]
    NOT?: OTPWhereInput | OTPWhereInput[]
    id?: StringFilter<"OTP"> | string
    phoneNumber?: StringFilter<"OTP"> | string
    countryCode?: StringFilter<"OTP"> | string
    otp?: StringFilter<"OTP"> | string
    expiresAt?: DateTimeFilter<"OTP"> | Date | string
    attempts?: IntFilter<"OTP"> | number
    userId?: StringNullableFilter<"OTP"> | string | null
    verified?: BoolFilter<"OTP"> | boolean
    createdAt?: DateTimeFilter<"OTP"> | Date | string
    updatedAt?: DateTimeFilter<"OTP"> | Date | string
  }

  export type OTPOrderByWithRelationInput = {
    id?: SortOrder
    phoneNumber?: SortOrder
    countryCode?: SortOrder
    otp?: SortOrder
    expiresAt?: SortOrder
    attempts?: SortOrder
    userId?: SortOrderInput | SortOrder
    verified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OTPWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    phoneNumber_countryCode?: OTPPhoneNumberCountryCodeCompoundUniqueInput
    AND?: OTPWhereInput | OTPWhereInput[]
    OR?: OTPWhereInput[]
    NOT?: OTPWhereInput | OTPWhereInput[]
    phoneNumber?: StringFilter<"OTP"> | string
    countryCode?: StringFilter<"OTP"> | string
    otp?: StringFilter<"OTP"> | string
    expiresAt?: DateTimeFilter<"OTP"> | Date | string
    attempts?: IntFilter<"OTP"> | number
    userId?: StringNullableFilter<"OTP"> | string | null
    verified?: BoolFilter<"OTP"> | boolean
    createdAt?: DateTimeFilter<"OTP"> | Date | string
    updatedAt?: DateTimeFilter<"OTP"> | Date | string
  }, "id" | "phoneNumber_countryCode">

  export type OTPOrderByWithAggregationInput = {
    id?: SortOrder
    phoneNumber?: SortOrder
    countryCode?: SortOrder
    otp?: SortOrder
    expiresAt?: SortOrder
    attempts?: SortOrder
    userId?: SortOrderInput | SortOrder
    verified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: OTPCountOrderByAggregateInput
    _avg?: OTPAvgOrderByAggregateInput
    _max?: OTPMaxOrderByAggregateInput
    _min?: OTPMinOrderByAggregateInput
    _sum?: OTPSumOrderByAggregateInput
  }

  export type OTPScalarWhereWithAggregatesInput = {
    AND?: OTPScalarWhereWithAggregatesInput | OTPScalarWhereWithAggregatesInput[]
    OR?: OTPScalarWhereWithAggregatesInput[]
    NOT?: OTPScalarWhereWithAggregatesInput | OTPScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OTP"> | string
    phoneNumber?: StringWithAggregatesFilter<"OTP"> | string
    countryCode?: StringWithAggregatesFilter<"OTP"> | string
    otp?: StringWithAggregatesFilter<"OTP"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"OTP"> | Date | string
    attempts?: IntWithAggregatesFilter<"OTP"> | number
    userId?: StringNullableWithAggregatesFilter<"OTP"> | string | null
    verified?: BoolWithAggregatesFilter<"OTP"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"OTP"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"OTP"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    phoneNumber: string
    countryCode: string
    createdAt?: Date | string
    updatedAt?: Date | string
    profiles?: ProfileCreateNestedManyWithoutUserInput
    savedJobs?: SavedJobCreateNestedManyWithoutUserInput
    jobSearchPreferences?: JobSearchPreferencesCreateNestedOneWithoutUserInput
    notificationPreferences?: NotificationPreferencesCreateNestedOneWithoutUserInput
    fcmTokens?: FCMTokenCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    phoneNumber: string
    countryCode: string
    createdAt?: Date | string
    updatedAt?: Date | string
    profiles?: ProfileUncheckedCreateNestedManyWithoutUserInput
    savedJobs?: SavedJobUncheckedCreateNestedManyWithoutUserInput
    jobSearchPreferences?: JobSearchPreferencesUncheckedCreateNestedOneWithoutUserInput
    notificationPreferences?: NotificationPreferencesUncheckedCreateNestedOneWithoutUserInput
    fcmTokens?: FCMTokenUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    countryCode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profiles?: ProfileUpdateManyWithoutUserNestedInput
    savedJobs?: SavedJobUpdateManyWithoutUserNestedInput
    jobSearchPreferences?: JobSearchPreferencesUpdateOneWithoutUserNestedInput
    notificationPreferences?: NotificationPreferencesUpdateOneWithoutUserNestedInput
    fcmTokens?: FCMTokenUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    countryCode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profiles?: ProfileUncheckedUpdateManyWithoutUserNestedInput
    savedJobs?: SavedJobUncheckedUpdateManyWithoutUserNestedInput
    jobSearchPreferences?: JobSearchPreferencesUncheckedUpdateOneWithoutUserNestedInput
    notificationPreferences?: NotificationPreferencesUncheckedUpdateOneWithoutUserNestedInput
    fcmTokens?: FCMTokenUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    phoneNumber: string
    countryCode: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    countryCode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    countryCode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfileCreateInput = {
    id?: string
    jobRoleId?: string | null
    fullName?: string | null
    email?: string | null
    bio?: string | null
    location?: string | null
    expectedSalary?: string | null
    yearsOfExperience?: string | null
    availableToStart?: string | null
    immediateJoiner?: boolean | null
    preferredRole?: string | null
    profilePicture?: string | null
    cvLink?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutProfilesInput
    education?: EducationCreateNestedManyWithoutProfileInput
    experience?: ExperienceCreateNestedManyWithoutProfileInput
    skillUserMap?: SkillUserMapCreateNestedManyWithoutProfileInput
    resumes?: ResumeCreateNestedManyWithoutProfileInput
  }

  export type ProfileUncheckedCreateInput = {
    id?: string
    userId: string
    jobRoleId?: string | null
    fullName?: string | null
    email?: string | null
    bio?: string | null
    location?: string | null
    expectedSalary?: string | null
    yearsOfExperience?: string | null
    availableToStart?: string | null
    immediateJoiner?: boolean | null
    preferredRole?: string | null
    profilePicture?: string | null
    cvLink?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    education?: EducationUncheckedCreateNestedManyWithoutProfileInput
    experience?: ExperienceUncheckedCreateNestedManyWithoutProfileInput
    skillUserMap?: SkillUserMapUncheckedCreateNestedManyWithoutProfileInput
    resumes?: ResumeUncheckedCreateNestedManyWithoutProfileInput
  }

  export type ProfileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobRoleId?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    expectedSalary?: NullableStringFieldUpdateOperationsInput | string | null
    yearsOfExperience?: NullableStringFieldUpdateOperationsInput | string | null
    availableToStart?: NullableStringFieldUpdateOperationsInput | string | null
    immediateJoiner?: NullableBoolFieldUpdateOperationsInput | boolean | null
    preferredRole?: NullableStringFieldUpdateOperationsInput | string | null
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    cvLink?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutProfilesNestedInput
    education?: EducationUpdateManyWithoutProfileNestedInput
    experience?: ExperienceUpdateManyWithoutProfileNestedInput
    skillUserMap?: SkillUserMapUpdateManyWithoutProfileNestedInput
    resumes?: ResumeUpdateManyWithoutProfileNestedInput
  }

  export type ProfileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    jobRoleId?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    expectedSalary?: NullableStringFieldUpdateOperationsInput | string | null
    yearsOfExperience?: NullableStringFieldUpdateOperationsInput | string | null
    availableToStart?: NullableStringFieldUpdateOperationsInput | string | null
    immediateJoiner?: NullableBoolFieldUpdateOperationsInput | boolean | null
    preferredRole?: NullableStringFieldUpdateOperationsInput | string | null
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    cvLink?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    education?: EducationUncheckedUpdateManyWithoutProfileNestedInput
    experience?: ExperienceUncheckedUpdateManyWithoutProfileNestedInput
    skillUserMap?: SkillUserMapUncheckedUpdateManyWithoutProfileNestedInput
    resumes?: ResumeUncheckedUpdateManyWithoutProfileNestedInput
  }

  export type ProfileCreateManyInput = {
    id?: string
    userId: string
    jobRoleId?: string | null
    fullName?: string | null
    email?: string | null
    bio?: string | null
    location?: string | null
    expectedSalary?: string | null
    yearsOfExperience?: string | null
    availableToStart?: string | null
    immediateJoiner?: boolean | null
    preferredRole?: string | null
    profilePicture?: string | null
    cvLink?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProfileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobRoleId?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    expectedSalary?: NullableStringFieldUpdateOperationsInput | string | null
    yearsOfExperience?: NullableStringFieldUpdateOperationsInput | string | null
    availableToStart?: NullableStringFieldUpdateOperationsInput | string | null
    immediateJoiner?: NullableBoolFieldUpdateOperationsInput | boolean | null
    preferredRole?: NullableStringFieldUpdateOperationsInput | string | null
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    cvLink?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    jobRoleId?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    expectedSalary?: NullableStringFieldUpdateOperationsInput | string | null
    yearsOfExperience?: NullableStringFieldUpdateOperationsInput | string | null
    availableToStart?: NullableStringFieldUpdateOperationsInput | string | null
    immediateJoiner?: NullableBoolFieldUpdateOperationsInput | boolean | null
    preferredRole?: NullableStringFieldUpdateOperationsInput | string | null
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    cvLink?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecruiterProfileCreateInput = {
    id?: string
    userId: string
    fullName?: string | null
    companyId?: string | null
    jobRoleId?: string | null
    workEmail?: string | null
    location?: string | null
    isVerified?: boolean
    verifiedBy?: string | null
    verificationDetails?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    recruiterVerificationMethods?: RecruiterVerificationMethodsCreateNestedOneWithoutRecruiterProfileInput
  }

  export type RecruiterProfileUncheckedCreateInput = {
    id?: string
    userId: string
    fullName?: string | null
    companyId?: string | null
    jobRoleId?: string | null
    workEmail?: string | null
    location?: string | null
    isVerified?: boolean
    recruiterVerificationMethodsId?: string | null
    verifiedBy?: string | null
    verificationDetails?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RecruiterProfileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    jobRoleId?: NullableStringFieldUpdateOperationsInput | string | null
    workEmail?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verifiedBy?: NullableStringFieldUpdateOperationsInput | string | null
    verificationDetails?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recruiterVerificationMethods?: RecruiterVerificationMethodsUpdateOneWithoutRecruiterProfileNestedInput
  }

  export type RecruiterProfileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    jobRoleId?: NullableStringFieldUpdateOperationsInput | string | null
    workEmail?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    recruiterVerificationMethodsId?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedBy?: NullableStringFieldUpdateOperationsInput | string | null
    verificationDetails?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecruiterProfileCreateManyInput = {
    id?: string
    userId: string
    fullName?: string | null
    companyId?: string | null
    jobRoleId?: string | null
    workEmail?: string | null
    location?: string | null
    isVerified?: boolean
    recruiterVerificationMethodsId?: string | null
    verifiedBy?: string | null
    verificationDetails?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RecruiterProfileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    jobRoleId?: NullableStringFieldUpdateOperationsInput | string | null
    workEmail?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verifiedBy?: NullableStringFieldUpdateOperationsInput | string | null
    verificationDetails?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecruiterProfileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    jobRoleId?: NullableStringFieldUpdateOperationsInput | string | null
    workEmail?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    recruiterVerificationMethodsId?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedBy?: NullableStringFieldUpdateOperationsInput | string | null
    verificationDetails?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecruiterVerificationMethodsCreateInput = {
    id?: string
    method: string
    RecruiterProfile?: RecruiterProfileCreateNestedManyWithoutRecruiterVerificationMethodsInput
  }

  export type RecruiterVerificationMethodsUncheckedCreateInput = {
    id?: string
    method: string
    RecruiterProfile?: RecruiterProfileUncheckedCreateNestedManyWithoutRecruiterVerificationMethodsInput
  }

  export type RecruiterVerificationMethodsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    method?: StringFieldUpdateOperationsInput | string
    RecruiterProfile?: RecruiterProfileUpdateManyWithoutRecruiterVerificationMethodsNestedInput
  }

  export type RecruiterVerificationMethodsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    method?: StringFieldUpdateOperationsInput | string
    RecruiterProfile?: RecruiterProfileUncheckedUpdateManyWithoutRecruiterVerificationMethodsNestedInput
  }

  export type RecruiterVerificationMethodsCreateManyInput = {
    id?: string
    method: string
  }

  export type RecruiterVerificationMethodsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    method?: StringFieldUpdateOperationsInput | string
  }

  export type RecruiterVerificationMethodsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    method?: StringFieldUpdateOperationsInput | string
  }

  export type SavedJobCreateInput = {
    id?: string
    jobId: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutSavedJobsInput
  }

  export type SavedJobUncheckedCreateInput = {
    id?: string
    userId: string
    jobId: string
    createdAt?: Date | string
  }

  export type SavedJobUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSavedJobsNestedInput
  }

  export type SavedJobUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    jobId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SavedJobCreateManyInput = {
    id?: string
    userId: string
    jobId: string
    createdAt?: Date | string
  }

  export type SavedJobUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SavedJobUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    jobId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SkillUserMapCreateInput = {
    id?: string
    skillId: string
    createdAt?: Date | string
    profile: ProfileCreateNestedOneWithoutSkillUserMapInput
  }

  export type SkillUserMapUncheckedCreateInput = {
    id?: string
    skillId: string
    profileId: string
    createdAt?: Date | string
  }

  export type SkillUserMapUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    skillId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneRequiredWithoutSkillUserMapNestedInput
  }

  export type SkillUserMapUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    skillId?: StringFieldUpdateOperationsInput | string
    profileId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SkillUserMapCreateManyInput = {
    id?: string
    skillId: string
    profileId: string
    createdAt?: Date | string
  }

  export type SkillUserMapUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    skillId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SkillUserMapUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    skillId?: StringFieldUpdateOperationsInput | string
    profileId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EducationCreateInput = {
    id?: string
    degree: string
    institution: string
    location?: string | null
    startDate: string
    endDate?: string | null
    grade?: string | null
    description?: string | null
    isCurrent: boolean
    profile: ProfileCreateNestedOneWithoutEducationInput
  }

  export type EducationUncheckedCreateInput = {
    id?: string
    profileId: string
    degree: string
    institution: string
    location?: string | null
    startDate: string
    endDate?: string | null
    grade?: string | null
    description?: string | null
    isCurrent: boolean
  }

  export type EducationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    degree?: StringFieldUpdateOperationsInput | string
    institution?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: StringFieldUpdateOperationsInput | string
    endDate?: NullableStringFieldUpdateOperationsInput | string | null
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    profile?: ProfileUpdateOneRequiredWithoutEducationNestedInput
  }

  export type EducationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    profileId?: StringFieldUpdateOperationsInput | string
    degree?: StringFieldUpdateOperationsInput | string
    institution?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: StringFieldUpdateOperationsInput | string
    endDate?: NullableStringFieldUpdateOperationsInput | string | null
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
  }

  export type EducationCreateManyInput = {
    id?: string
    profileId: string
    degree: string
    institution: string
    location?: string | null
    startDate: string
    endDate?: string | null
    grade?: string | null
    description?: string | null
    isCurrent: boolean
  }

  export type EducationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    degree?: StringFieldUpdateOperationsInput | string
    institution?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: StringFieldUpdateOperationsInput | string
    endDate?: NullableStringFieldUpdateOperationsInput | string | null
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
  }

  export type EducationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    profileId?: StringFieldUpdateOperationsInput | string
    degree?: StringFieldUpdateOperationsInput | string
    institution?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: StringFieldUpdateOperationsInput | string
    endDate?: NullableStringFieldUpdateOperationsInput | string | null
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ExperienceCreateInput = {
    id?: string
    jobRoleId?: string | null
    companyId: string
    location?: string | null
    startDate: string
    endDate?: string | null
    isCurrent: boolean
    rolesAndResponsibilities?: string | null
    profile: ProfileCreateNestedOneWithoutExperienceInput
  }

  export type ExperienceUncheckedCreateInput = {
    id?: string
    profileId: string
    jobRoleId?: string | null
    companyId: string
    location?: string | null
    startDate: string
    endDate?: string | null
    isCurrent: boolean
    rolesAndResponsibilities?: string | null
  }

  export type ExperienceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobRoleId?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: StringFieldUpdateOperationsInput | string
    endDate?: NullableStringFieldUpdateOperationsInput | string | null
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    rolesAndResponsibilities?: NullableStringFieldUpdateOperationsInput | string | null
    profile?: ProfileUpdateOneRequiredWithoutExperienceNestedInput
  }

  export type ExperienceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    profileId?: StringFieldUpdateOperationsInput | string
    jobRoleId?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: StringFieldUpdateOperationsInput | string
    endDate?: NullableStringFieldUpdateOperationsInput | string | null
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    rolesAndResponsibilities?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ExperienceCreateManyInput = {
    id?: string
    profileId: string
    jobRoleId?: string | null
    companyId: string
    location?: string | null
    startDate: string
    endDate?: string | null
    isCurrent: boolean
    rolesAndResponsibilities?: string | null
  }

  export type ExperienceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobRoleId?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: StringFieldUpdateOperationsInput | string
    endDate?: NullableStringFieldUpdateOperationsInput | string | null
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    rolesAndResponsibilities?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ExperienceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    profileId?: StringFieldUpdateOperationsInput | string
    jobRoleId?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: StringFieldUpdateOperationsInput | string
    endDate?: NullableStringFieldUpdateOperationsInput | string | null
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    rolesAndResponsibilities?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ResumeCreateInput = {
    id?: string
    title: string
    fileName: string
    fileUrl: string
    fileSize?: number | null
    mimeType: string
    isDefault?: boolean
    isActive?: boolean
    uploadedAt?: Date | string
    updatedAt?: Date | string
    profile: ProfileCreateNestedOneWithoutResumesInput
  }

  export type ResumeUncheckedCreateInput = {
    id?: string
    profileId: string
    title: string
    fileName: string
    fileUrl: string
    fileSize?: number | null
    mimeType: string
    isDefault?: boolean
    isActive?: boolean
    uploadedAt?: Date | string
    updatedAt?: Date | string
  }

  export type ResumeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    mimeType?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneRequiredWithoutResumesNestedInput
  }

  export type ResumeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    profileId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    mimeType?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResumeCreateManyInput = {
    id?: string
    profileId: string
    title: string
    fileName: string
    fileUrl: string
    fileSize?: number | null
    mimeType: string
    isDefault?: boolean
    isActive?: boolean
    uploadedAt?: Date | string
    updatedAt?: Date | string
  }

  export type ResumeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    mimeType?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResumeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    profileId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    mimeType?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationPreferencesCreateInput = {
    id?: string
    jobMatches?: boolean
    applications?: boolean
    interviews?: boolean
    messages?: boolean
    emailEnabled?: boolean
    pushEnabled?: boolean
    quietHours?: string | null
    frequency?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutNotificationPreferencesInput
  }

  export type NotificationPreferencesUncheckedCreateInput = {
    id?: string
    userId: string
    jobMatches?: boolean
    applications?: boolean
    interviews?: boolean
    messages?: boolean
    emailEnabled?: boolean
    pushEnabled?: boolean
    quietHours?: string | null
    frequency?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotificationPreferencesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobMatches?: BoolFieldUpdateOperationsInput | boolean
    applications?: BoolFieldUpdateOperationsInput | boolean
    interviews?: BoolFieldUpdateOperationsInput | boolean
    messages?: BoolFieldUpdateOperationsInput | boolean
    emailEnabled?: BoolFieldUpdateOperationsInput | boolean
    pushEnabled?: BoolFieldUpdateOperationsInput | boolean
    quietHours?: NullableStringFieldUpdateOperationsInput | string | null
    frequency?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutNotificationPreferencesNestedInput
  }

  export type NotificationPreferencesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    jobMatches?: BoolFieldUpdateOperationsInput | boolean
    applications?: BoolFieldUpdateOperationsInput | boolean
    interviews?: BoolFieldUpdateOperationsInput | boolean
    messages?: BoolFieldUpdateOperationsInput | boolean
    emailEnabled?: BoolFieldUpdateOperationsInput | boolean
    pushEnabled?: BoolFieldUpdateOperationsInput | boolean
    quietHours?: NullableStringFieldUpdateOperationsInput | string | null
    frequency?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationPreferencesCreateManyInput = {
    id?: string
    userId: string
    jobMatches?: boolean
    applications?: boolean
    interviews?: boolean
    messages?: boolean
    emailEnabled?: boolean
    pushEnabled?: boolean
    quietHours?: string | null
    frequency?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotificationPreferencesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobMatches?: BoolFieldUpdateOperationsInput | boolean
    applications?: BoolFieldUpdateOperationsInput | boolean
    interviews?: BoolFieldUpdateOperationsInput | boolean
    messages?: BoolFieldUpdateOperationsInput | boolean
    emailEnabled?: BoolFieldUpdateOperationsInput | boolean
    pushEnabled?: BoolFieldUpdateOperationsInput | boolean
    quietHours?: NullableStringFieldUpdateOperationsInput | string | null
    frequency?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationPreferencesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    jobMatches?: BoolFieldUpdateOperationsInput | boolean
    applications?: BoolFieldUpdateOperationsInput | boolean
    interviews?: BoolFieldUpdateOperationsInput | boolean
    messages?: BoolFieldUpdateOperationsInput | boolean
    emailEnabled?: BoolFieldUpdateOperationsInput | boolean
    pushEnabled?: BoolFieldUpdateOperationsInput | boolean
    quietHours?: NullableStringFieldUpdateOperationsInput | string | null
    frequency?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobSearchPreferencesCreateInput = {
    id?: string
    desiredJobTypes: string
    minSalary?: number | null
    maxSalary?: number | null
    salaryCurrency?: string
    salaryPeriod?: string
    desiredLocations?: string | null
    isRemoteOnly?: boolean
    isWillingToRelocate?: boolean
    maxCommuteMiles?: number | null
    desiredRoles: string
    desiredSkills: string
    yearsOfExperience?: string | null
    desiredIndustries: string
    minCompanySize?: number | null
    maxCompanySize?: number | null
    excludedCompanies: string
    isSearchActive?: boolean
    lastSearchDate?: Date | string | null
    savedSearches?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutJobSearchPreferencesInput
  }

  export type JobSearchPreferencesUncheckedCreateInput = {
    id?: string
    userId: string
    desiredJobTypes: string
    minSalary?: number | null
    maxSalary?: number | null
    salaryCurrency?: string
    salaryPeriod?: string
    desiredLocations?: string | null
    isRemoteOnly?: boolean
    isWillingToRelocate?: boolean
    maxCommuteMiles?: number | null
    desiredRoles: string
    desiredSkills: string
    yearsOfExperience?: string | null
    desiredIndustries: string
    minCompanySize?: number | null
    maxCompanySize?: number | null
    excludedCompanies: string
    isSearchActive?: boolean
    lastSearchDate?: Date | string | null
    savedSearches?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type JobSearchPreferencesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    desiredJobTypes?: StringFieldUpdateOperationsInput | string
    minSalary?: NullableIntFieldUpdateOperationsInput | number | null
    maxSalary?: NullableIntFieldUpdateOperationsInput | number | null
    salaryCurrency?: StringFieldUpdateOperationsInput | string
    salaryPeriod?: StringFieldUpdateOperationsInput | string
    desiredLocations?: NullableStringFieldUpdateOperationsInput | string | null
    isRemoteOnly?: BoolFieldUpdateOperationsInput | boolean
    isWillingToRelocate?: BoolFieldUpdateOperationsInput | boolean
    maxCommuteMiles?: NullableIntFieldUpdateOperationsInput | number | null
    desiredRoles?: StringFieldUpdateOperationsInput | string
    desiredSkills?: StringFieldUpdateOperationsInput | string
    yearsOfExperience?: NullableStringFieldUpdateOperationsInput | string | null
    desiredIndustries?: StringFieldUpdateOperationsInput | string
    minCompanySize?: NullableIntFieldUpdateOperationsInput | number | null
    maxCompanySize?: NullableIntFieldUpdateOperationsInput | number | null
    excludedCompanies?: StringFieldUpdateOperationsInput | string
    isSearchActive?: BoolFieldUpdateOperationsInput | boolean
    lastSearchDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    savedSearches?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutJobSearchPreferencesNestedInput
  }

  export type JobSearchPreferencesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    desiredJobTypes?: StringFieldUpdateOperationsInput | string
    minSalary?: NullableIntFieldUpdateOperationsInput | number | null
    maxSalary?: NullableIntFieldUpdateOperationsInput | number | null
    salaryCurrency?: StringFieldUpdateOperationsInput | string
    salaryPeriod?: StringFieldUpdateOperationsInput | string
    desiredLocations?: NullableStringFieldUpdateOperationsInput | string | null
    isRemoteOnly?: BoolFieldUpdateOperationsInput | boolean
    isWillingToRelocate?: BoolFieldUpdateOperationsInput | boolean
    maxCommuteMiles?: NullableIntFieldUpdateOperationsInput | number | null
    desiredRoles?: StringFieldUpdateOperationsInput | string
    desiredSkills?: StringFieldUpdateOperationsInput | string
    yearsOfExperience?: NullableStringFieldUpdateOperationsInput | string | null
    desiredIndustries?: StringFieldUpdateOperationsInput | string
    minCompanySize?: NullableIntFieldUpdateOperationsInput | number | null
    maxCompanySize?: NullableIntFieldUpdateOperationsInput | number | null
    excludedCompanies?: StringFieldUpdateOperationsInput | string
    isSearchActive?: BoolFieldUpdateOperationsInput | boolean
    lastSearchDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    savedSearches?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobSearchPreferencesCreateManyInput = {
    id?: string
    userId: string
    desiredJobTypes: string
    minSalary?: number | null
    maxSalary?: number | null
    salaryCurrency?: string
    salaryPeriod?: string
    desiredLocations?: string | null
    isRemoteOnly?: boolean
    isWillingToRelocate?: boolean
    maxCommuteMiles?: number | null
    desiredRoles: string
    desiredSkills: string
    yearsOfExperience?: string | null
    desiredIndustries: string
    minCompanySize?: number | null
    maxCompanySize?: number | null
    excludedCompanies: string
    isSearchActive?: boolean
    lastSearchDate?: Date | string | null
    savedSearches?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type JobSearchPreferencesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    desiredJobTypes?: StringFieldUpdateOperationsInput | string
    minSalary?: NullableIntFieldUpdateOperationsInput | number | null
    maxSalary?: NullableIntFieldUpdateOperationsInput | number | null
    salaryCurrency?: StringFieldUpdateOperationsInput | string
    salaryPeriod?: StringFieldUpdateOperationsInput | string
    desiredLocations?: NullableStringFieldUpdateOperationsInput | string | null
    isRemoteOnly?: BoolFieldUpdateOperationsInput | boolean
    isWillingToRelocate?: BoolFieldUpdateOperationsInput | boolean
    maxCommuteMiles?: NullableIntFieldUpdateOperationsInput | number | null
    desiredRoles?: StringFieldUpdateOperationsInput | string
    desiredSkills?: StringFieldUpdateOperationsInput | string
    yearsOfExperience?: NullableStringFieldUpdateOperationsInput | string | null
    desiredIndustries?: StringFieldUpdateOperationsInput | string
    minCompanySize?: NullableIntFieldUpdateOperationsInput | number | null
    maxCompanySize?: NullableIntFieldUpdateOperationsInput | number | null
    excludedCompanies?: StringFieldUpdateOperationsInput | string
    isSearchActive?: BoolFieldUpdateOperationsInput | boolean
    lastSearchDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    savedSearches?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobSearchPreferencesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    desiredJobTypes?: StringFieldUpdateOperationsInput | string
    minSalary?: NullableIntFieldUpdateOperationsInput | number | null
    maxSalary?: NullableIntFieldUpdateOperationsInput | number | null
    salaryCurrency?: StringFieldUpdateOperationsInput | string
    salaryPeriod?: StringFieldUpdateOperationsInput | string
    desiredLocations?: NullableStringFieldUpdateOperationsInput | string | null
    isRemoteOnly?: BoolFieldUpdateOperationsInput | boolean
    isWillingToRelocate?: BoolFieldUpdateOperationsInput | boolean
    maxCommuteMiles?: NullableIntFieldUpdateOperationsInput | number | null
    desiredRoles?: StringFieldUpdateOperationsInput | string
    desiredSkills?: StringFieldUpdateOperationsInput | string
    yearsOfExperience?: NullableStringFieldUpdateOperationsInput | string | null
    desiredIndustries?: StringFieldUpdateOperationsInput | string
    minCompanySize?: NullableIntFieldUpdateOperationsInput | number | null
    maxCompanySize?: NullableIntFieldUpdateOperationsInput | number | null
    excludedCompanies?: StringFieldUpdateOperationsInput | string
    isSearchActive?: BoolFieldUpdateOperationsInput | boolean
    lastSearchDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    savedSearches?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FCMTokenCreateInput = {
    id?: string
    token: string
    platform: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutFcmTokensInput
  }

  export type FCMTokenUncheckedCreateInput = {
    id?: string
    userId: string
    token: string
    platform: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FCMTokenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutFcmTokensNestedInput
  }

  export type FCMTokenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FCMTokenCreateManyInput = {
    id?: string
    userId: string
    token: string
    platform: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FCMTokenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FCMTokenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OTPCreateInput = {
    id?: string
    phoneNumber: string
    countryCode: string
    otp: string
    expiresAt: Date | string
    attempts?: number
    userId?: string | null
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OTPUncheckedCreateInput = {
    id?: string
    phoneNumber: string
    countryCode: string
    otp: string
    expiresAt: Date | string
    attempts?: number
    userId?: string | null
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OTPUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    countryCode?: StringFieldUpdateOperationsInput | string
    otp?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attempts?: IntFieldUpdateOperationsInput | number
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OTPUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    countryCode?: StringFieldUpdateOperationsInput | string
    otp?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attempts?: IntFieldUpdateOperationsInput | number
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OTPCreateManyInput = {
    id?: string
    phoneNumber: string
    countryCode: string
    otp: string
    expiresAt: Date | string
    attempts?: number
    userId?: string | null
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OTPUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    countryCode?: StringFieldUpdateOperationsInput | string
    otp?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attempts?: IntFieldUpdateOperationsInput | number
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OTPUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    countryCode?: StringFieldUpdateOperationsInput | string
    otp?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attempts?: IntFieldUpdateOperationsInput | number
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ProfileListRelationFilter = {
    every?: ProfileWhereInput
    some?: ProfileWhereInput
    none?: ProfileWhereInput
  }

  export type SavedJobListRelationFilter = {
    every?: SavedJobWhereInput
    some?: SavedJobWhereInput
    none?: SavedJobWhereInput
  }

  export type JobSearchPreferencesNullableScalarRelationFilter = {
    is?: JobSearchPreferencesWhereInput | null
    isNot?: JobSearchPreferencesWhereInput | null
  }

  export type NotificationPreferencesNullableScalarRelationFilter = {
    is?: NotificationPreferencesWhereInput | null
    isNot?: NotificationPreferencesWhereInput | null
  }

  export type FCMTokenListRelationFilter = {
    every?: FCMTokenWhereInput
    some?: FCMTokenWhereInput
    none?: FCMTokenWhereInput
  }

  export type ProfileOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SavedJobOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FCMTokenOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserPhoneNumberCountryCodeCompoundUniqueInput = {
    phoneNumber: string
    countryCode: string
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    phoneNumber?: SortOrder
    countryCode?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    phoneNumber?: SortOrder
    countryCode?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    phoneNumber?: SortOrder
    countryCode?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type EducationListRelationFilter = {
    every?: EducationWhereInput
    some?: EducationWhereInput
    none?: EducationWhereInput
  }

  export type ExperienceListRelationFilter = {
    every?: ExperienceWhereInput
    some?: ExperienceWhereInput
    none?: ExperienceWhereInput
  }

  export type SkillUserMapListRelationFilter = {
    every?: SkillUserMapWhereInput
    some?: SkillUserMapWhereInput
    none?: SkillUserMapWhereInput
  }

  export type ResumeListRelationFilter = {
    every?: ResumeWhereInput
    some?: ResumeWhereInput
    none?: ResumeWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type EducationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ExperienceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SkillUserMapOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ResumeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProfileCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    jobRoleId?: SortOrder
    fullName?: SortOrder
    email?: SortOrder
    bio?: SortOrder
    location?: SortOrder
    expectedSalary?: SortOrder
    yearsOfExperience?: SortOrder
    availableToStart?: SortOrder
    immediateJoiner?: SortOrder
    preferredRole?: SortOrder
    profilePicture?: SortOrder
    cvLink?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    jobRoleId?: SortOrder
    fullName?: SortOrder
    email?: SortOrder
    bio?: SortOrder
    location?: SortOrder
    expectedSalary?: SortOrder
    yearsOfExperience?: SortOrder
    availableToStart?: SortOrder
    immediateJoiner?: SortOrder
    preferredRole?: SortOrder
    profilePicture?: SortOrder
    cvLink?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProfileMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    jobRoleId?: SortOrder
    fullName?: SortOrder
    email?: SortOrder
    bio?: SortOrder
    location?: SortOrder
    expectedSalary?: SortOrder
    yearsOfExperience?: SortOrder
    availableToStart?: SortOrder
    immediateJoiner?: SortOrder
    preferredRole?: SortOrder
    profilePicture?: SortOrder
    cvLink?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type RecruiterVerificationMethodsNullableScalarRelationFilter = {
    is?: RecruiterVerificationMethodsWhereInput | null
    isNot?: RecruiterVerificationMethodsWhereInput | null
  }

  export type RecruiterProfileCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    fullName?: SortOrder
    companyId?: SortOrder
    jobRoleId?: SortOrder
    workEmail?: SortOrder
    location?: SortOrder
    isVerified?: SortOrder
    recruiterVerificationMethodsId?: SortOrder
    verifiedBy?: SortOrder
    verificationDetails?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RecruiterProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    fullName?: SortOrder
    companyId?: SortOrder
    jobRoleId?: SortOrder
    workEmail?: SortOrder
    location?: SortOrder
    isVerified?: SortOrder
    recruiterVerificationMethodsId?: SortOrder
    verifiedBy?: SortOrder
    verificationDetails?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RecruiterProfileMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    fullName?: SortOrder
    companyId?: SortOrder
    jobRoleId?: SortOrder
    workEmail?: SortOrder
    location?: SortOrder
    isVerified?: SortOrder
    recruiterVerificationMethodsId?: SortOrder
    verifiedBy?: SortOrder
    verificationDetails?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type RecruiterProfileListRelationFilter = {
    every?: RecruiterProfileWhereInput
    some?: RecruiterProfileWhereInput
    none?: RecruiterProfileWhereInput
  }

  export type RecruiterProfileOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RecruiterVerificationMethodsCountOrderByAggregateInput = {
    id?: SortOrder
    method?: SortOrder
  }

  export type RecruiterVerificationMethodsMaxOrderByAggregateInput = {
    id?: SortOrder
    method?: SortOrder
  }

  export type RecruiterVerificationMethodsMinOrderByAggregateInput = {
    id?: SortOrder
    method?: SortOrder
  }

  export type SavedJobUserIdJobIdCompoundUniqueInput = {
    userId: string
    jobId: string
  }

  export type SavedJobCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    jobId?: SortOrder
    createdAt?: SortOrder
  }

  export type SavedJobMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    jobId?: SortOrder
    createdAt?: SortOrder
  }

  export type SavedJobMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    jobId?: SortOrder
    createdAt?: SortOrder
  }

  export type ProfileScalarRelationFilter = {
    is?: ProfileWhereInput
    isNot?: ProfileWhereInput
  }

  export type SkillUserMapSkillIdProfileIdCompoundUniqueInput = {
    skillId: string
    profileId: string
  }

  export type SkillUserMapCountOrderByAggregateInput = {
    id?: SortOrder
    skillId?: SortOrder
    profileId?: SortOrder
    createdAt?: SortOrder
  }

  export type SkillUserMapMaxOrderByAggregateInput = {
    id?: SortOrder
    skillId?: SortOrder
    profileId?: SortOrder
    createdAt?: SortOrder
  }

  export type SkillUserMapMinOrderByAggregateInput = {
    id?: SortOrder
    skillId?: SortOrder
    profileId?: SortOrder
    createdAt?: SortOrder
  }

  export type EducationCountOrderByAggregateInput = {
    id?: SortOrder
    profileId?: SortOrder
    degree?: SortOrder
    institution?: SortOrder
    location?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    grade?: SortOrder
    description?: SortOrder
    isCurrent?: SortOrder
  }

  export type EducationMaxOrderByAggregateInput = {
    id?: SortOrder
    profileId?: SortOrder
    degree?: SortOrder
    institution?: SortOrder
    location?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    grade?: SortOrder
    description?: SortOrder
    isCurrent?: SortOrder
  }

  export type EducationMinOrderByAggregateInput = {
    id?: SortOrder
    profileId?: SortOrder
    degree?: SortOrder
    institution?: SortOrder
    location?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    grade?: SortOrder
    description?: SortOrder
    isCurrent?: SortOrder
  }

  export type ExperienceCountOrderByAggregateInput = {
    id?: SortOrder
    profileId?: SortOrder
    jobRoleId?: SortOrder
    companyId?: SortOrder
    location?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    isCurrent?: SortOrder
    rolesAndResponsibilities?: SortOrder
  }

  export type ExperienceMaxOrderByAggregateInput = {
    id?: SortOrder
    profileId?: SortOrder
    jobRoleId?: SortOrder
    companyId?: SortOrder
    location?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    isCurrent?: SortOrder
    rolesAndResponsibilities?: SortOrder
  }

  export type ExperienceMinOrderByAggregateInput = {
    id?: SortOrder
    profileId?: SortOrder
    jobRoleId?: SortOrder
    companyId?: SortOrder
    location?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    isCurrent?: SortOrder
    rolesAndResponsibilities?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type ResumeCountOrderByAggregateInput = {
    id?: SortOrder
    profileId?: SortOrder
    title?: SortOrder
    fileName?: SortOrder
    fileUrl?: SortOrder
    fileSize?: SortOrder
    mimeType?: SortOrder
    isDefault?: SortOrder
    isActive?: SortOrder
    uploadedAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ResumeAvgOrderByAggregateInput = {
    fileSize?: SortOrder
  }

  export type ResumeMaxOrderByAggregateInput = {
    id?: SortOrder
    profileId?: SortOrder
    title?: SortOrder
    fileName?: SortOrder
    fileUrl?: SortOrder
    fileSize?: SortOrder
    mimeType?: SortOrder
    isDefault?: SortOrder
    isActive?: SortOrder
    uploadedAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ResumeMinOrderByAggregateInput = {
    id?: SortOrder
    profileId?: SortOrder
    title?: SortOrder
    fileName?: SortOrder
    fileUrl?: SortOrder
    fileSize?: SortOrder
    mimeType?: SortOrder
    isDefault?: SortOrder
    isActive?: SortOrder
    uploadedAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ResumeSumOrderByAggregateInput = {
    fileSize?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NotificationPreferencesCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    jobMatches?: SortOrder
    applications?: SortOrder
    interviews?: SortOrder
    messages?: SortOrder
    emailEnabled?: SortOrder
    pushEnabled?: SortOrder
    quietHours?: SortOrder
    frequency?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NotificationPreferencesMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    jobMatches?: SortOrder
    applications?: SortOrder
    interviews?: SortOrder
    messages?: SortOrder
    emailEnabled?: SortOrder
    pushEnabled?: SortOrder
    quietHours?: SortOrder
    frequency?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NotificationPreferencesMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    jobMatches?: SortOrder
    applications?: SortOrder
    interviews?: SortOrder
    messages?: SortOrder
    emailEnabled?: SortOrder
    pushEnabled?: SortOrder
    quietHours?: SortOrder
    frequency?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type JobSearchPreferencesCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    desiredJobTypes?: SortOrder
    minSalary?: SortOrder
    maxSalary?: SortOrder
    salaryCurrency?: SortOrder
    salaryPeriod?: SortOrder
    desiredLocations?: SortOrder
    isRemoteOnly?: SortOrder
    isWillingToRelocate?: SortOrder
    maxCommuteMiles?: SortOrder
    desiredRoles?: SortOrder
    desiredSkills?: SortOrder
    yearsOfExperience?: SortOrder
    desiredIndustries?: SortOrder
    minCompanySize?: SortOrder
    maxCompanySize?: SortOrder
    excludedCompanies?: SortOrder
    isSearchActive?: SortOrder
    lastSearchDate?: SortOrder
    savedSearches?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type JobSearchPreferencesAvgOrderByAggregateInput = {
    minSalary?: SortOrder
    maxSalary?: SortOrder
    maxCommuteMiles?: SortOrder
    minCompanySize?: SortOrder
    maxCompanySize?: SortOrder
  }

  export type JobSearchPreferencesMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    desiredJobTypes?: SortOrder
    minSalary?: SortOrder
    maxSalary?: SortOrder
    salaryCurrency?: SortOrder
    salaryPeriod?: SortOrder
    desiredLocations?: SortOrder
    isRemoteOnly?: SortOrder
    isWillingToRelocate?: SortOrder
    maxCommuteMiles?: SortOrder
    desiredRoles?: SortOrder
    desiredSkills?: SortOrder
    yearsOfExperience?: SortOrder
    desiredIndustries?: SortOrder
    minCompanySize?: SortOrder
    maxCompanySize?: SortOrder
    excludedCompanies?: SortOrder
    isSearchActive?: SortOrder
    lastSearchDate?: SortOrder
    savedSearches?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type JobSearchPreferencesMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    desiredJobTypes?: SortOrder
    minSalary?: SortOrder
    maxSalary?: SortOrder
    salaryCurrency?: SortOrder
    salaryPeriod?: SortOrder
    desiredLocations?: SortOrder
    isRemoteOnly?: SortOrder
    isWillingToRelocate?: SortOrder
    maxCommuteMiles?: SortOrder
    desiredRoles?: SortOrder
    desiredSkills?: SortOrder
    yearsOfExperience?: SortOrder
    desiredIndustries?: SortOrder
    minCompanySize?: SortOrder
    maxCompanySize?: SortOrder
    excludedCompanies?: SortOrder
    isSearchActive?: SortOrder
    lastSearchDate?: SortOrder
    savedSearches?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type JobSearchPreferencesSumOrderByAggregateInput = {
    minSalary?: SortOrder
    maxSalary?: SortOrder
    maxCommuteMiles?: SortOrder
    minCompanySize?: SortOrder
    maxCompanySize?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type FCMTokenCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    platform?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FCMTokenMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    platform?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FCMTokenMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    platform?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type OTPPhoneNumberCountryCodeCompoundUniqueInput = {
    phoneNumber: string
    countryCode: string
  }

  export type OTPCountOrderByAggregateInput = {
    id?: SortOrder
    phoneNumber?: SortOrder
    countryCode?: SortOrder
    otp?: SortOrder
    expiresAt?: SortOrder
    attempts?: SortOrder
    userId?: SortOrder
    verified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OTPAvgOrderByAggregateInput = {
    attempts?: SortOrder
  }

  export type OTPMaxOrderByAggregateInput = {
    id?: SortOrder
    phoneNumber?: SortOrder
    countryCode?: SortOrder
    otp?: SortOrder
    expiresAt?: SortOrder
    attempts?: SortOrder
    userId?: SortOrder
    verified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OTPMinOrderByAggregateInput = {
    id?: SortOrder
    phoneNumber?: SortOrder
    countryCode?: SortOrder
    otp?: SortOrder
    expiresAt?: SortOrder
    attempts?: SortOrder
    userId?: SortOrder
    verified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OTPSumOrderByAggregateInput = {
    attempts?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type ProfileCreateNestedManyWithoutUserInput = {
    create?: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput> | ProfileCreateWithoutUserInput[] | ProfileUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProfileCreateOrConnectWithoutUserInput | ProfileCreateOrConnectWithoutUserInput[]
    createMany?: ProfileCreateManyUserInputEnvelope
    connect?: ProfileWhereUniqueInput | ProfileWhereUniqueInput[]
  }

  export type SavedJobCreateNestedManyWithoutUserInput = {
    create?: XOR<SavedJobCreateWithoutUserInput, SavedJobUncheckedCreateWithoutUserInput> | SavedJobCreateWithoutUserInput[] | SavedJobUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SavedJobCreateOrConnectWithoutUserInput | SavedJobCreateOrConnectWithoutUserInput[]
    createMany?: SavedJobCreateManyUserInputEnvelope
    connect?: SavedJobWhereUniqueInput | SavedJobWhereUniqueInput[]
  }

  export type JobSearchPreferencesCreateNestedOneWithoutUserInput = {
    create?: XOR<JobSearchPreferencesCreateWithoutUserInput, JobSearchPreferencesUncheckedCreateWithoutUserInput>
    connectOrCreate?: JobSearchPreferencesCreateOrConnectWithoutUserInput
    connect?: JobSearchPreferencesWhereUniqueInput
  }

  export type NotificationPreferencesCreateNestedOneWithoutUserInput = {
    create?: XOR<NotificationPreferencesCreateWithoutUserInput, NotificationPreferencesUncheckedCreateWithoutUserInput>
    connectOrCreate?: NotificationPreferencesCreateOrConnectWithoutUserInput
    connect?: NotificationPreferencesWhereUniqueInput
  }

  export type FCMTokenCreateNestedManyWithoutUserInput = {
    create?: XOR<FCMTokenCreateWithoutUserInput, FCMTokenUncheckedCreateWithoutUserInput> | FCMTokenCreateWithoutUserInput[] | FCMTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FCMTokenCreateOrConnectWithoutUserInput | FCMTokenCreateOrConnectWithoutUserInput[]
    createMany?: FCMTokenCreateManyUserInputEnvelope
    connect?: FCMTokenWhereUniqueInput | FCMTokenWhereUniqueInput[]
  }

  export type ProfileUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput> | ProfileCreateWithoutUserInput[] | ProfileUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProfileCreateOrConnectWithoutUserInput | ProfileCreateOrConnectWithoutUserInput[]
    createMany?: ProfileCreateManyUserInputEnvelope
    connect?: ProfileWhereUniqueInput | ProfileWhereUniqueInput[]
  }

  export type SavedJobUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SavedJobCreateWithoutUserInput, SavedJobUncheckedCreateWithoutUserInput> | SavedJobCreateWithoutUserInput[] | SavedJobUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SavedJobCreateOrConnectWithoutUserInput | SavedJobCreateOrConnectWithoutUserInput[]
    createMany?: SavedJobCreateManyUserInputEnvelope
    connect?: SavedJobWhereUniqueInput | SavedJobWhereUniqueInput[]
  }

  export type JobSearchPreferencesUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<JobSearchPreferencesCreateWithoutUserInput, JobSearchPreferencesUncheckedCreateWithoutUserInput>
    connectOrCreate?: JobSearchPreferencesCreateOrConnectWithoutUserInput
    connect?: JobSearchPreferencesWhereUniqueInput
  }

  export type NotificationPreferencesUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<NotificationPreferencesCreateWithoutUserInput, NotificationPreferencesUncheckedCreateWithoutUserInput>
    connectOrCreate?: NotificationPreferencesCreateOrConnectWithoutUserInput
    connect?: NotificationPreferencesWhereUniqueInput
  }

  export type FCMTokenUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<FCMTokenCreateWithoutUserInput, FCMTokenUncheckedCreateWithoutUserInput> | FCMTokenCreateWithoutUserInput[] | FCMTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FCMTokenCreateOrConnectWithoutUserInput | FCMTokenCreateOrConnectWithoutUserInput[]
    createMany?: FCMTokenCreateManyUserInputEnvelope
    connect?: FCMTokenWhereUniqueInput | FCMTokenWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ProfileUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput> | ProfileCreateWithoutUserInput[] | ProfileUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProfileCreateOrConnectWithoutUserInput | ProfileCreateOrConnectWithoutUserInput[]
    upsert?: ProfileUpsertWithWhereUniqueWithoutUserInput | ProfileUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProfileCreateManyUserInputEnvelope
    set?: ProfileWhereUniqueInput | ProfileWhereUniqueInput[]
    disconnect?: ProfileWhereUniqueInput | ProfileWhereUniqueInput[]
    delete?: ProfileWhereUniqueInput | ProfileWhereUniqueInput[]
    connect?: ProfileWhereUniqueInput | ProfileWhereUniqueInput[]
    update?: ProfileUpdateWithWhereUniqueWithoutUserInput | ProfileUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProfileUpdateManyWithWhereWithoutUserInput | ProfileUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProfileScalarWhereInput | ProfileScalarWhereInput[]
  }

  export type SavedJobUpdateManyWithoutUserNestedInput = {
    create?: XOR<SavedJobCreateWithoutUserInput, SavedJobUncheckedCreateWithoutUserInput> | SavedJobCreateWithoutUserInput[] | SavedJobUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SavedJobCreateOrConnectWithoutUserInput | SavedJobCreateOrConnectWithoutUserInput[]
    upsert?: SavedJobUpsertWithWhereUniqueWithoutUserInput | SavedJobUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SavedJobCreateManyUserInputEnvelope
    set?: SavedJobWhereUniqueInput | SavedJobWhereUniqueInput[]
    disconnect?: SavedJobWhereUniqueInput | SavedJobWhereUniqueInput[]
    delete?: SavedJobWhereUniqueInput | SavedJobWhereUniqueInput[]
    connect?: SavedJobWhereUniqueInput | SavedJobWhereUniqueInput[]
    update?: SavedJobUpdateWithWhereUniqueWithoutUserInput | SavedJobUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SavedJobUpdateManyWithWhereWithoutUserInput | SavedJobUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SavedJobScalarWhereInput | SavedJobScalarWhereInput[]
  }

  export type JobSearchPreferencesUpdateOneWithoutUserNestedInput = {
    create?: XOR<JobSearchPreferencesCreateWithoutUserInput, JobSearchPreferencesUncheckedCreateWithoutUserInput>
    connectOrCreate?: JobSearchPreferencesCreateOrConnectWithoutUserInput
    upsert?: JobSearchPreferencesUpsertWithoutUserInput
    disconnect?: JobSearchPreferencesWhereInput | boolean
    delete?: JobSearchPreferencesWhereInput | boolean
    connect?: JobSearchPreferencesWhereUniqueInput
    update?: XOR<XOR<JobSearchPreferencesUpdateToOneWithWhereWithoutUserInput, JobSearchPreferencesUpdateWithoutUserInput>, JobSearchPreferencesUncheckedUpdateWithoutUserInput>
  }

  export type NotificationPreferencesUpdateOneWithoutUserNestedInput = {
    create?: XOR<NotificationPreferencesCreateWithoutUserInput, NotificationPreferencesUncheckedCreateWithoutUserInput>
    connectOrCreate?: NotificationPreferencesCreateOrConnectWithoutUserInput
    upsert?: NotificationPreferencesUpsertWithoutUserInput
    disconnect?: NotificationPreferencesWhereInput | boolean
    delete?: NotificationPreferencesWhereInput | boolean
    connect?: NotificationPreferencesWhereUniqueInput
    update?: XOR<XOR<NotificationPreferencesUpdateToOneWithWhereWithoutUserInput, NotificationPreferencesUpdateWithoutUserInput>, NotificationPreferencesUncheckedUpdateWithoutUserInput>
  }

  export type FCMTokenUpdateManyWithoutUserNestedInput = {
    create?: XOR<FCMTokenCreateWithoutUserInput, FCMTokenUncheckedCreateWithoutUserInput> | FCMTokenCreateWithoutUserInput[] | FCMTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FCMTokenCreateOrConnectWithoutUserInput | FCMTokenCreateOrConnectWithoutUserInput[]
    upsert?: FCMTokenUpsertWithWhereUniqueWithoutUserInput | FCMTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FCMTokenCreateManyUserInputEnvelope
    set?: FCMTokenWhereUniqueInput | FCMTokenWhereUniqueInput[]
    disconnect?: FCMTokenWhereUniqueInput | FCMTokenWhereUniqueInput[]
    delete?: FCMTokenWhereUniqueInput | FCMTokenWhereUniqueInput[]
    connect?: FCMTokenWhereUniqueInput | FCMTokenWhereUniqueInput[]
    update?: FCMTokenUpdateWithWhereUniqueWithoutUserInput | FCMTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FCMTokenUpdateManyWithWhereWithoutUserInput | FCMTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FCMTokenScalarWhereInput | FCMTokenScalarWhereInput[]
  }

  export type ProfileUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput> | ProfileCreateWithoutUserInput[] | ProfileUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProfileCreateOrConnectWithoutUserInput | ProfileCreateOrConnectWithoutUserInput[]
    upsert?: ProfileUpsertWithWhereUniqueWithoutUserInput | ProfileUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProfileCreateManyUserInputEnvelope
    set?: ProfileWhereUniqueInput | ProfileWhereUniqueInput[]
    disconnect?: ProfileWhereUniqueInput | ProfileWhereUniqueInput[]
    delete?: ProfileWhereUniqueInput | ProfileWhereUniqueInput[]
    connect?: ProfileWhereUniqueInput | ProfileWhereUniqueInput[]
    update?: ProfileUpdateWithWhereUniqueWithoutUserInput | ProfileUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProfileUpdateManyWithWhereWithoutUserInput | ProfileUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProfileScalarWhereInput | ProfileScalarWhereInput[]
  }

  export type SavedJobUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SavedJobCreateWithoutUserInput, SavedJobUncheckedCreateWithoutUserInput> | SavedJobCreateWithoutUserInput[] | SavedJobUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SavedJobCreateOrConnectWithoutUserInput | SavedJobCreateOrConnectWithoutUserInput[]
    upsert?: SavedJobUpsertWithWhereUniqueWithoutUserInput | SavedJobUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SavedJobCreateManyUserInputEnvelope
    set?: SavedJobWhereUniqueInput | SavedJobWhereUniqueInput[]
    disconnect?: SavedJobWhereUniqueInput | SavedJobWhereUniqueInput[]
    delete?: SavedJobWhereUniqueInput | SavedJobWhereUniqueInput[]
    connect?: SavedJobWhereUniqueInput | SavedJobWhereUniqueInput[]
    update?: SavedJobUpdateWithWhereUniqueWithoutUserInput | SavedJobUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SavedJobUpdateManyWithWhereWithoutUserInput | SavedJobUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SavedJobScalarWhereInput | SavedJobScalarWhereInput[]
  }

  export type JobSearchPreferencesUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<JobSearchPreferencesCreateWithoutUserInput, JobSearchPreferencesUncheckedCreateWithoutUserInput>
    connectOrCreate?: JobSearchPreferencesCreateOrConnectWithoutUserInput
    upsert?: JobSearchPreferencesUpsertWithoutUserInput
    disconnect?: JobSearchPreferencesWhereInput | boolean
    delete?: JobSearchPreferencesWhereInput | boolean
    connect?: JobSearchPreferencesWhereUniqueInput
    update?: XOR<XOR<JobSearchPreferencesUpdateToOneWithWhereWithoutUserInput, JobSearchPreferencesUpdateWithoutUserInput>, JobSearchPreferencesUncheckedUpdateWithoutUserInput>
  }

  export type NotificationPreferencesUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<NotificationPreferencesCreateWithoutUserInput, NotificationPreferencesUncheckedCreateWithoutUserInput>
    connectOrCreate?: NotificationPreferencesCreateOrConnectWithoutUserInput
    upsert?: NotificationPreferencesUpsertWithoutUserInput
    disconnect?: NotificationPreferencesWhereInput | boolean
    delete?: NotificationPreferencesWhereInput | boolean
    connect?: NotificationPreferencesWhereUniqueInput
    update?: XOR<XOR<NotificationPreferencesUpdateToOneWithWhereWithoutUserInput, NotificationPreferencesUpdateWithoutUserInput>, NotificationPreferencesUncheckedUpdateWithoutUserInput>
  }

  export type FCMTokenUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<FCMTokenCreateWithoutUserInput, FCMTokenUncheckedCreateWithoutUserInput> | FCMTokenCreateWithoutUserInput[] | FCMTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FCMTokenCreateOrConnectWithoutUserInput | FCMTokenCreateOrConnectWithoutUserInput[]
    upsert?: FCMTokenUpsertWithWhereUniqueWithoutUserInput | FCMTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FCMTokenCreateManyUserInputEnvelope
    set?: FCMTokenWhereUniqueInput | FCMTokenWhereUniqueInput[]
    disconnect?: FCMTokenWhereUniqueInput | FCMTokenWhereUniqueInput[]
    delete?: FCMTokenWhereUniqueInput | FCMTokenWhereUniqueInput[]
    connect?: FCMTokenWhereUniqueInput | FCMTokenWhereUniqueInput[]
    update?: FCMTokenUpdateWithWhereUniqueWithoutUserInput | FCMTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FCMTokenUpdateManyWithWhereWithoutUserInput | FCMTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FCMTokenScalarWhereInput | FCMTokenScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutProfilesInput = {
    create?: XOR<UserCreateWithoutProfilesInput, UserUncheckedCreateWithoutProfilesInput>
    connectOrCreate?: UserCreateOrConnectWithoutProfilesInput
    connect?: UserWhereUniqueInput
  }

  export type EducationCreateNestedManyWithoutProfileInput = {
    create?: XOR<EducationCreateWithoutProfileInput, EducationUncheckedCreateWithoutProfileInput> | EducationCreateWithoutProfileInput[] | EducationUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: EducationCreateOrConnectWithoutProfileInput | EducationCreateOrConnectWithoutProfileInput[]
    createMany?: EducationCreateManyProfileInputEnvelope
    connect?: EducationWhereUniqueInput | EducationWhereUniqueInput[]
  }

  export type ExperienceCreateNestedManyWithoutProfileInput = {
    create?: XOR<ExperienceCreateWithoutProfileInput, ExperienceUncheckedCreateWithoutProfileInput> | ExperienceCreateWithoutProfileInput[] | ExperienceUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: ExperienceCreateOrConnectWithoutProfileInput | ExperienceCreateOrConnectWithoutProfileInput[]
    createMany?: ExperienceCreateManyProfileInputEnvelope
    connect?: ExperienceWhereUniqueInput | ExperienceWhereUniqueInput[]
  }

  export type SkillUserMapCreateNestedManyWithoutProfileInput = {
    create?: XOR<SkillUserMapCreateWithoutProfileInput, SkillUserMapUncheckedCreateWithoutProfileInput> | SkillUserMapCreateWithoutProfileInput[] | SkillUserMapUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: SkillUserMapCreateOrConnectWithoutProfileInput | SkillUserMapCreateOrConnectWithoutProfileInput[]
    createMany?: SkillUserMapCreateManyProfileInputEnvelope
    connect?: SkillUserMapWhereUniqueInput | SkillUserMapWhereUniqueInput[]
  }

  export type ResumeCreateNestedManyWithoutProfileInput = {
    create?: XOR<ResumeCreateWithoutProfileInput, ResumeUncheckedCreateWithoutProfileInput> | ResumeCreateWithoutProfileInput[] | ResumeUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: ResumeCreateOrConnectWithoutProfileInput | ResumeCreateOrConnectWithoutProfileInput[]
    createMany?: ResumeCreateManyProfileInputEnvelope
    connect?: ResumeWhereUniqueInput | ResumeWhereUniqueInput[]
  }

  export type EducationUncheckedCreateNestedManyWithoutProfileInput = {
    create?: XOR<EducationCreateWithoutProfileInput, EducationUncheckedCreateWithoutProfileInput> | EducationCreateWithoutProfileInput[] | EducationUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: EducationCreateOrConnectWithoutProfileInput | EducationCreateOrConnectWithoutProfileInput[]
    createMany?: EducationCreateManyProfileInputEnvelope
    connect?: EducationWhereUniqueInput | EducationWhereUniqueInput[]
  }

  export type ExperienceUncheckedCreateNestedManyWithoutProfileInput = {
    create?: XOR<ExperienceCreateWithoutProfileInput, ExperienceUncheckedCreateWithoutProfileInput> | ExperienceCreateWithoutProfileInput[] | ExperienceUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: ExperienceCreateOrConnectWithoutProfileInput | ExperienceCreateOrConnectWithoutProfileInput[]
    createMany?: ExperienceCreateManyProfileInputEnvelope
    connect?: ExperienceWhereUniqueInput | ExperienceWhereUniqueInput[]
  }

  export type SkillUserMapUncheckedCreateNestedManyWithoutProfileInput = {
    create?: XOR<SkillUserMapCreateWithoutProfileInput, SkillUserMapUncheckedCreateWithoutProfileInput> | SkillUserMapCreateWithoutProfileInput[] | SkillUserMapUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: SkillUserMapCreateOrConnectWithoutProfileInput | SkillUserMapCreateOrConnectWithoutProfileInput[]
    createMany?: SkillUserMapCreateManyProfileInputEnvelope
    connect?: SkillUserMapWhereUniqueInput | SkillUserMapWhereUniqueInput[]
  }

  export type ResumeUncheckedCreateNestedManyWithoutProfileInput = {
    create?: XOR<ResumeCreateWithoutProfileInput, ResumeUncheckedCreateWithoutProfileInput> | ResumeCreateWithoutProfileInput[] | ResumeUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: ResumeCreateOrConnectWithoutProfileInput | ResumeCreateOrConnectWithoutProfileInput[]
    createMany?: ResumeCreateManyProfileInputEnvelope
    connect?: ResumeWhereUniqueInput | ResumeWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type UserUpdateOneRequiredWithoutProfilesNestedInput = {
    create?: XOR<UserCreateWithoutProfilesInput, UserUncheckedCreateWithoutProfilesInput>
    connectOrCreate?: UserCreateOrConnectWithoutProfilesInput
    upsert?: UserUpsertWithoutProfilesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProfilesInput, UserUpdateWithoutProfilesInput>, UserUncheckedUpdateWithoutProfilesInput>
  }

  export type EducationUpdateManyWithoutProfileNestedInput = {
    create?: XOR<EducationCreateWithoutProfileInput, EducationUncheckedCreateWithoutProfileInput> | EducationCreateWithoutProfileInput[] | EducationUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: EducationCreateOrConnectWithoutProfileInput | EducationCreateOrConnectWithoutProfileInput[]
    upsert?: EducationUpsertWithWhereUniqueWithoutProfileInput | EducationUpsertWithWhereUniqueWithoutProfileInput[]
    createMany?: EducationCreateManyProfileInputEnvelope
    set?: EducationWhereUniqueInput | EducationWhereUniqueInput[]
    disconnect?: EducationWhereUniqueInput | EducationWhereUniqueInput[]
    delete?: EducationWhereUniqueInput | EducationWhereUniqueInput[]
    connect?: EducationWhereUniqueInput | EducationWhereUniqueInput[]
    update?: EducationUpdateWithWhereUniqueWithoutProfileInput | EducationUpdateWithWhereUniqueWithoutProfileInput[]
    updateMany?: EducationUpdateManyWithWhereWithoutProfileInput | EducationUpdateManyWithWhereWithoutProfileInput[]
    deleteMany?: EducationScalarWhereInput | EducationScalarWhereInput[]
  }

  export type ExperienceUpdateManyWithoutProfileNestedInput = {
    create?: XOR<ExperienceCreateWithoutProfileInput, ExperienceUncheckedCreateWithoutProfileInput> | ExperienceCreateWithoutProfileInput[] | ExperienceUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: ExperienceCreateOrConnectWithoutProfileInput | ExperienceCreateOrConnectWithoutProfileInput[]
    upsert?: ExperienceUpsertWithWhereUniqueWithoutProfileInput | ExperienceUpsertWithWhereUniqueWithoutProfileInput[]
    createMany?: ExperienceCreateManyProfileInputEnvelope
    set?: ExperienceWhereUniqueInput | ExperienceWhereUniqueInput[]
    disconnect?: ExperienceWhereUniqueInput | ExperienceWhereUniqueInput[]
    delete?: ExperienceWhereUniqueInput | ExperienceWhereUniqueInput[]
    connect?: ExperienceWhereUniqueInput | ExperienceWhereUniqueInput[]
    update?: ExperienceUpdateWithWhereUniqueWithoutProfileInput | ExperienceUpdateWithWhereUniqueWithoutProfileInput[]
    updateMany?: ExperienceUpdateManyWithWhereWithoutProfileInput | ExperienceUpdateManyWithWhereWithoutProfileInput[]
    deleteMany?: ExperienceScalarWhereInput | ExperienceScalarWhereInput[]
  }

  export type SkillUserMapUpdateManyWithoutProfileNestedInput = {
    create?: XOR<SkillUserMapCreateWithoutProfileInput, SkillUserMapUncheckedCreateWithoutProfileInput> | SkillUserMapCreateWithoutProfileInput[] | SkillUserMapUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: SkillUserMapCreateOrConnectWithoutProfileInput | SkillUserMapCreateOrConnectWithoutProfileInput[]
    upsert?: SkillUserMapUpsertWithWhereUniqueWithoutProfileInput | SkillUserMapUpsertWithWhereUniqueWithoutProfileInput[]
    createMany?: SkillUserMapCreateManyProfileInputEnvelope
    set?: SkillUserMapWhereUniqueInput | SkillUserMapWhereUniqueInput[]
    disconnect?: SkillUserMapWhereUniqueInput | SkillUserMapWhereUniqueInput[]
    delete?: SkillUserMapWhereUniqueInput | SkillUserMapWhereUniqueInput[]
    connect?: SkillUserMapWhereUniqueInput | SkillUserMapWhereUniqueInput[]
    update?: SkillUserMapUpdateWithWhereUniqueWithoutProfileInput | SkillUserMapUpdateWithWhereUniqueWithoutProfileInput[]
    updateMany?: SkillUserMapUpdateManyWithWhereWithoutProfileInput | SkillUserMapUpdateManyWithWhereWithoutProfileInput[]
    deleteMany?: SkillUserMapScalarWhereInput | SkillUserMapScalarWhereInput[]
  }

  export type ResumeUpdateManyWithoutProfileNestedInput = {
    create?: XOR<ResumeCreateWithoutProfileInput, ResumeUncheckedCreateWithoutProfileInput> | ResumeCreateWithoutProfileInput[] | ResumeUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: ResumeCreateOrConnectWithoutProfileInput | ResumeCreateOrConnectWithoutProfileInput[]
    upsert?: ResumeUpsertWithWhereUniqueWithoutProfileInput | ResumeUpsertWithWhereUniqueWithoutProfileInput[]
    createMany?: ResumeCreateManyProfileInputEnvelope
    set?: ResumeWhereUniqueInput | ResumeWhereUniqueInput[]
    disconnect?: ResumeWhereUniqueInput | ResumeWhereUniqueInput[]
    delete?: ResumeWhereUniqueInput | ResumeWhereUniqueInput[]
    connect?: ResumeWhereUniqueInput | ResumeWhereUniqueInput[]
    update?: ResumeUpdateWithWhereUniqueWithoutProfileInput | ResumeUpdateWithWhereUniqueWithoutProfileInput[]
    updateMany?: ResumeUpdateManyWithWhereWithoutProfileInput | ResumeUpdateManyWithWhereWithoutProfileInput[]
    deleteMany?: ResumeScalarWhereInput | ResumeScalarWhereInput[]
  }

  export type EducationUncheckedUpdateManyWithoutProfileNestedInput = {
    create?: XOR<EducationCreateWithoutProfileInput, EducationUncheckedCreateWithoutProfileInput> | EducationCreateWithoutProfileInput[] | EducationUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: EducationCreateOrConnectWithoutProfileInput | EducationCreateOrConnectWithoutProfileInput[]
    upsert?: EducationUpsertWithWhereUniqueWithoutProfileInput | EducationUpsertWithWhereUniqueWithoutProfileInput[]
    createMany?: EducationCreateManyProfileInputEnvelope
    set?: EducationWhereUniqueInput | EducationWhereUniqueInput[]
    disconnect?: EducationWhereUniqueInput | EducationWhereUniqueInput[]
    delete?: EducationWhereUniqueInput | EducationWhereUniqueInput[]
    connect?: EducationWhereUniqueInput | EducationWhereUniqueInput[]
    update?: EducationUpdateWithWhereUniqueWithoutProfileInput | EducationUpdateWithWhereUniqueWithoutProfileInput[]
    updateMany?: EducationUpdateManyWithWhereWithoutProfileInput | EducationUpdateManyWithWhereWithoutProfileInput[]
    deleteMany?: EducationScalarWhereInput | EducationScalarWhereInput[]
  }

  export type ExperienceUncheckedUpdateManyWithoutProfileNestedInput = {
    create?: XOR<ExperienceCreateWithoutProfileInput, ExperienceUncheckedCreateWithoutProfileInput> | ExperienceCreateWithoutProfileInput[] | ExperienceUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: ExperienceCreateOrConnectWithoutProfileInput | ExperienceCreateOrConnectWithoutProfileInput[]
    upsert?: ExperienceUpsertWithWhereUniqueWithoutProfileInput | ExperienceUpsertWithWhereUniqueWithoutProfileInput[]
    createMany?: ExperienceCreateManyProfileInputEnvelope
    set?: ExperienceWhereUniqueInput | ExperienceWhereUniqueInput[]
    disconnect?: ExperienceWhereUniqueInput | ExperienceWhereUniqueInput[]
    delete?: ExperienceWhereUniqueInput | ExperienceWhereUniqueInput[]
    connect?: ExperienceWhereUniqueInput | ExperienceWhereUniqueInput[]
    update?: ExperienceUpdateWithWhereUniqueWithoutProfileInput | ExperienceUpdateWithWhereUniqueWithoutProfileInput[]
    updateMany?: ExperienceUpdateManyWithWhereWithoutProfileInput | ExperienceUpdateManyWithWhereWithoutProfileInput[]
    deleteMany?: ExperienceScalarWhereInput | ExperienceScalarWhereInput[]
  }

  export type SkillUserMapUncheckedUpdateManyWithoutProfileNestedInput = {
    create?: XOR<SkillUserMapCreateWithoutProfileInput, SkillUserMapUncheckedCreateWithoutProfileInput> | SkillUserMapCreateWithoutProfileInput[] | SkillUserMapUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: SkillUserMapCreateOrConnectWithoutProfileInput | SkillUserMapCreateOrConnectWithoutProfileInput[]
    upsert?: SkillUserMapUpsertWithWhereUniqueWithoutProfileInput | SkillUserMapUpsertWithWhereUniqueWithoutProfileInput[]
    createMany?: SkillUserMapCreateManyProfileInputEnvelope
    set?: SkillUserMapWhereUniqueInput | SkillUserMapWhereUniqueInput[]
    disconnect?: SkillUserMapWhereUniqueInput | SkillUserMapWhereUniqueInput[]
    delete?: SkillUserMapWhereUniqueInput | SkillUserMapWhereUniqueInput[]
    connect?: SkillUserMapWhereUniqueInput | SkillUserMapWhereUniqueInput[]
    update?: SkillUserMapUpdateWithWhereUniqueWithoutProfileInput | SkillUserMapUpdateWithWhereUniqueWithoutProfileInput[]
    updateMany?: SkillUserMapUpdateManyWithWhereWithoutProfileInput | SkillUserMapUpdateManyWithWhereWithoutProfileInput[]
    deleteMany?: SkillUserMapScalarWhereInput | SkillUserMapScalarWhereInput[]
  }

  export type ResumeUncheckedUpdateManyWithoutProfileNestedInput = {
    create?: XOR<ResumeCreateWithoutProfileInput, ResumeUncheckedCreateWithoutProfileInput> | ResumeCreateWithoutProfileInput[] | ResumeUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: ResumeCreateOrConnectWithoutProfileInput | ResumeCreateOrConnectWithoutProfileInput[]
    upsert?: ResumeUpsertWithWhereUniqueWithoutProfileInput | ResumeUpsertWithWhereUniqueWithoutProfileInput[]
    createMany?: ResumeCreateManyProfileInputEnvelope
    set?: ResumeWhereUniqueInput | ResumeWhereUniqueInput[]
    disconnect?: ResumeWhereUniqueInput | ResumeWhereUniqueInput[]
    delete?: ResumeWhereUniqueInput | ResumeWhereUniqueInput[]
    connect?: ResumeWhereUniqueInput | ResumeWhereUniqueInput[]
    update?: ResumeUpdateWithWhereUniqueWithoutProfileInput | ResumeUpdateWithWhereUniqueWithoutProfileInput[]
    updateMany?: ResumeUpdateManyWithWhereWithoutProfileInput | ResumeUpdateManyWithWhereWithoutProfileInput[]
    deleteMany?: ResumeScalarWhereInput | ResumeScalarWhereInput[]
  }

  export type RecruiterVerificationMethodsCreateNestedOneWithoutRecruiterProfileInput = {
    create?: XOR<RecruiterVerificationMethodsCreateWithoutRecruiterProfileInput, RecruiterVerificationMethodsUncheckedCreateWithoutRecruiterProfileInput>
    connectOrCreate?: RecruiterVerificationMethodsCreateOrConnectWithoutRecruiterProfileInput
    connect?: RecruiterVerificationMethodsWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type RecruiterVerificationMethodsUpdateOneWithoutRecruiterProfileNestedInput = {
    create?: XOR<RecruiterVerificationMethodsCreateWithoutRecruiterProfileInput, RecruiterVerificationMethodsUncheckedCreateWithoutRecruiterProfileInput>
    connectOrCreate?: RecruiterVerificationMethodsCreateOrConnectWithoutRecruiterProfileInput
    upsert?: RecruiterVerificationMethodsUpsertWithoutRecruiterProfileInput
    disconnect?: RecruiterVerificationMethodsWhereInput | boolean
    delete?: RecruiterVerificationMethodsWhereInput | boolean
    connect?: RecruiterVerificationMethodsWhereUniqueInput
    update?: XOR<XOR<RecruiterVerificationMethodsUpdateToOneWithWhereWithoutRecruiterProfileInput, RecruiterVerificationMethodsUpdateWithoutRecruiterProfileInput>, RecruiterVerificationMethodsUncheckedUpdateWithoutRecruiterProfileInput>
  }

  export type RecruiterProfileCreateNestedManyWithoutRecruiterVerificationMethodsInput = {
    create?: XOR<RecruiterProfileCreateWithoutRecruiterVerificationMethodsInput, RecruiterProfileUncheckedCreateWithoutRecruiterVerificationMethodsInput> | RecruiterProfileCreateWithoutRecruiterVerificationMethodsInput[] | RecruiterProfileUncheckedCreateWithoutRecruiterVerificationMethodsInput[]
    connectOrCreate?: RecruiterProfileCreateOrConnectWithoutRecruiterVerificationMethodsInput | RecruiterProfileCreateOrConnectWithoutRecruiterVerificationMethodsInput[]
    createMany?: RecruiterProfileCreateManyRecruiterVerificationMethodsInputEnvelope
    connect?: RecruiterProfileWhereUniqueInput | RecruiterProfileWhereUniqueInput[]
  }

  export type RecruiterProfileUncheckedCreateNestedManyWithoutRecruiterVerificationMethodsInput = {
    create?: XOR<RecruiterProfileCreateWithoutRecruiterVerificationMethodsInput, RecruiterProfileUncheckedCreateWithoutRecruiterVerificationMethodsInput> | RecruiterProfileCreateWithoutRecruiterVerificationMethodsInput[] | RecruiterProfileUncheckedCreateWithoutRecruiterVerificationMethodsInput[]
    connectOrCreate?: RecruiterProfileCreateOrConnectWithoutRecruiterVerificationMethodsInput | RecruiterProfileCreateOrConnectWithoutRecruiterVerificationMethodsInput[]
    createMany?: RecruiterProfileCreateManyRecruiterVerificationMethodsInputEnvelope
    connect?: RecruiterProfileWhereUniqueInput | RecruiterProfileWhereUniqueInput[]
  }

  export type RecruiterProfileUpdateManyWithoutRecruiterVerificationMethodsNestedInput = {
    create?: XOR<RecruiterProfileCreateWithoutRecruiterVerificationMethodsInput, RecruiterProfileUncheckedCreateWithoutRecruiterVerificationMethodsInput> | RecruiterProfileCreateWithoutRecruiterVerificationMethodsInput[] | RecruiterProfileUncheckedCreateWithoutRecruiterVerificationMethodsInput[]
    connectOrCreate?: RecruiterProfileCreateOrConnectWithoutRecruiterVerificationMethodsInput | RecruiterProfileCreateOrConnectWithoutRecruiterVerificationMethodsInput[]
    upsert?: RecruiterProfileUpsertWithWhereUniqueWithoutRecruiterVerificationMethodsInput | RecruiterProfileUpsertWithWhereUniqueWithoutRecruiterVerificationMethodsInput[]
    createMany?: RecruiterProfileCreateManyRecruiterVerificationMethodsInputEnvelope
    set?: RecruiterProfileWhereUniqueInput | RecruiterProfileWhereUniqueInput[]
    disconnect?: RecruiterProfileWhereUniqueInput | RecruiterProfileWhereUniqueInput[]
    delete?: RecruiterProfileWhereUniqueInput | RecruiterProfileWhereUniqueInput[]
    connect?: RecruiterProfileWhereUniqueInput | RecruiterProfileWhereUniqueInput[]
    update?: RecruiterProfileUpdateWithWhereUniqueWithoutRecruiterVerificationMethodsInput | RecruiterProfileUpdateWithWhereUniqueWithoutRecruiterVerificationMethodsInput[]
    updateMany?: RecruiterProfileUpdateManyWithWhereWithoutRecruiterVerificationMethodsInput | RecruiterProfileUpdateManyWithWhereWithoutRecruiterVerificationMethodsInput[]
    deleteMany?: RecruiterProfileScalarWhereInput | RecruiterProfileScalarWhereInput[]
  }

  export type RecruiterProfileUncheckedUpdateManyWithoutRecruiterVerificationMethodsNestedInput = {
    create?: XOR<RecruiterProfileCreateWithoutRecruiterVerificationMethodsInput, RecruiterProfileUncheckedCreateWithoutRecruiterVerificationMethodsInput> | RecruiterProfileCreateWithoutRecruiterVerificationMethodsInput[] | RecruiterProfileUncheckedCreateWithoutRecruiterVerificationMethodsInput[]
    connectOrCreate?: RecruiterProfileCreateOrConnectWithoutRecruiterVerificationMethodsInput | RecruiterProfileCreateOrConnectWithoutRecruiterVerificationMethodsInput[]
    upsert?: RecruiterProfileUpsertWithWhereUniqueWithoutRecruiterVerificationMethodsInput | RecruiterProfileUpsertWithWhereUniqueWithoutRecruiterVerificationMethodsInput[]
    createMany?: RecruiterProfileCreateManyRecruiterVerificationMethodsInputEnvelope
    set?: RecruiterProfileWhereUniqueInput | RecruiterProfileWhereUniqueInput[]
    disconnect?: RecruiterProfileWhereUniqueInput | RecruiterProfileWhereUniqueInput[]
    delete?: RecruiterProfileWhereUniqueInput | RecruiterProfileWhereUniqueInput[]
    connect?: RecruiterProfileWhereUniqueInput | RecruiterProfileWhereUniqueInput[]
    update?: RecruiterProfileUpdateWithWhereUniqueWithoutRecruiterVerificationMethodsInput | RecruiterProfileUpdateWithWhereUniqueWithoutRecruiterVerificationMethodsInput[]
    updateMany?: RecruiterProfileUpdateManyWithWhereWithoutRecruiterVerificationMethodsInput | RecruiterProfileUpdateManyWithWhereWithoutRecruiterVerificationMethodsInput[]
    deleteMany?: RecruiterProfileScalarWhereInput | RecruiterProfileScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutSavedJobsInput = {
    create?: XOR<UserCreateWithoutSavedJobsInput, UserUncheckedCreateWithoutSavedJobsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSavedJobsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSavedJobsNestedInput = {
    create?: XOR<UserCreateWithoutSavedJobsInput, UserUncheckedCreateWithoutSavedJobsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSavedJobsInput
    upsert?: UserUpsertWithoutSavedJobsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSavedJobsInput, UserUpdateWithoutSavedJobsInput>, UserUncheckedUpdateWithoutSavedJobsInput>
  }

  export type ProfileCreateNestedOneWithoutSkillUserMapInput = {
    create?: XOR<ProfileCreateWithoutSkillUserMapInput, ProfileUncheckedCreateWithoutSkillUserMapInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutSkillUserMapInput
    connect?: ProfileWhereUniqueInput
  }

  export type ProfileUpdateOneRequiredWithoutSkillUserMapNestedInput = {
    create?: XOR<ProfileCreateWithoutSkillUserMapInput, ProfileUncheckedCreateWithoutSkillUserMapInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutSkillUserMapInput
    upsert?: ProfileUpsertWithoutSkillUserMapInput
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutSkillUserMapInput, ProfileUpdateWithoutSkillUserMapInput>, ProfileUncheckedUpdateWithoutSkillUserMapInput>
  }

  export type ProfileCreateNestedOneWithoutEducationInput = {
    create?: XOR<ProfileCreateWithoutEducationInput, ProfileUncheckedCreateWithoutEducationInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutEducationInput
    connect?: ProfileWhereUniqueInput
  }

  export type ProfileUpdateOneRequiredWithoutEducationNestedInput = {
    create?: XOR<ProfileCreateWithoutEducationInput, ProfileUncheckedCreateWithoutEducationInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutEducationInput
    upsert?: ProfileUpsertWithoutEducationInput
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutEducationInput, ProfileUpdateWithoutEducationInput>, ProfileUncheckedUpdateWithoutEducationInput>
  }

  export type ProfileCreateNestedOneWithoutExperienceInput = {
    create?: XOR<ProfileCreateWithoutExperienceInput, ProfileUncheckedCreateWithoutExperienceInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutExperienceInput
    connect?: ProfileWhereUniqueInput
  }

  export type ProfileUpdateOneRequiredWithoutExperienceNestedInput = {
    create?: XOR<ProfileCreateWithoutExperienceInput, ProfileUncheckedCreateWithoutExperienceInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutExperienceInput
    upsert?: ProfileUpsertWithoutExperienceInput
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutExperienceInput, ProfileUpdateWithoutExperienceInput>, ProfileUncheckedUpdateWithoutExperienceInput>
  }

  export type ProfileCreateNestedOneWithoutResumesInput = {
    create?: XOR<ProfileCreateWithoutResumesInput, ProfileUncheckedCreateWithoutResumesInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutResumesInput
    connect?: ProfileWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ProfileUpdateOneRequiredWithoutResumesNestedInput = {
    create?: XOR<ProfileCreateWithoutResumesInput, ProfileUncheckedCreateWithoutResumesInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutResumesInput
    upsert?: ProfileUpsertWithoutResumesInput
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutResumesInput, ProfileUpdateWithoutResumesInput>, ProfileUncheckedUpdateWithoutResumesInput>
  }

  export type UserCreateNestedOneWithoutNotificationPreferencesInput = {
    create?: XOR<UserCreateWithoutNotificationPreferencesInput, UserUncheckedCreateWithoutNotificationPreferencesInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationPreferencesInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutNotificationPreferencesNestedInput = {
    create?: XOR<UserCreateWithoutNotificationPreferencesInput, UserUncheckedCreateWithoutNotificationPreferencesInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationPreferencesInput
    upsert?: UserUpsertWithoutNotificationPreferencesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutNotificationPreferencesInput, UserUpdateWithoutNotificationPreferencesInput>, UserUncheckedUpdateWithoutNotificationPreferencesInput>
  }

  export type UserCreateNestedOneWithoutJobSearchPreferencesInput = {
    create?: XOR<UserCreateWithoutJobSearchPreferencesInput, UserUncheckedCreateWithoutJobSearchPreferencesInput>
    connectOrCreate?: UserCreateOrConnectWithoutJobSearchPreferencesInput
    connect?: UserWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutJobSearchPreferencesNestedInput = {
    create?: XOR<UserCreateWithoutJobSearchPreferencesInput, UserUncheckedCreateWithoutJobSearchPreferencesInput>
    connectOrCreate?: UserCreateOrConnectWithoutJobSearchPreferencesInput
    upsert?: UserUpsertWithoutJobSearchPreferencesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutJobSearchPreferencesInput, UserUpdateWithoutJobSearchPreferencesInput>, UserUncheckedUpdateWithoutJobSearchPreferencesInput>
  }

  export type UserCreateNestedOneWithoutFcmTokensInput = {
    create?: XOR<UserCreateWithoutFcmTokensInput, UserUncheckedCreateWithoutFcmTokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutFcmTokensInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutFcmTokensNestedInput = {
    create?: XOR<UserCreateWithoutFcmTokensInput, UserUncheckedCreateWithoutFcmTokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutFcmTokensInput
    upsert?: UserUpsertWithoutFcmTokensInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFcmTokensInput, UserUpdateWithoutFcmTokensInput>, UserUncheckedUpdateWithoutFcmTokensInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type ProfileCreateWithoutUserInput = {
    id?: string
    jobRoleId?: string | null
    fullName?: string | null
    email?: string | null
    bio?: string | null
    location?: string | null
    expectedSalary?: string | null
    yearsOfExperience?: string | null
    availableToStart?: string | null
    immediateJoiner?: boolean | null
    preferredRole?: string | null
    profilePicture?: string | null
    cvLink?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    education?: EducationCreateNestedManyWithoutProfileInput
    experience?: ExperienceCreateNestedManyWithoutProfileInput
    skillUserMap?: SkillUserMapCreateNestedManyWithoutProfileInput
    resumes?: ResumeCreateNestedManyWithoutProfileInput
  }

  export type ProfileUncheckedCreateWithoutUserInput = {
    id?: string
    jobRoleId?: string | null
    fullName?: string | null
    email?: string | null
    bio?: string | null
    location?: string | null
    expectedSalary?: string | null
    yearsOfExperience?: string | null
    availableToStart?: string | null
    immediateJoiner?: boolean | null
    preferredRole?: string | null
    profilePicture?: string | null
    cvLink?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    education?: EducationUncheckedCreateNestedManyWithoutProfileInput
    experience?: ExperienceUncheckedCreateNestedManyWithoutProfileInput
    skillUserMap?: SkillUserMapUncheckedCreateNestedManyWithoutProfileInput
    resumes?: ResumeUncheckedCreateNestedManyWithoutProfileInput
  }

  export type ProfileCreateOrConnectWithoutUserInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput>
  }

  export type ProfileCreateManyUserInputEnvelope = {
    data: ProfileCreateManyUserInput | ProfileCreateManyUserInput[]
  }

  export type SavedJobCreateWithoutUserInput = {
    id?: string
    jobId: string
    createdAt?: Date | string
  }

  export type SavedJobUncheckedCreateWithoutUserInput = {
    id?: string
    jobId: string
    createdAt?: Date | string
  }

  export type SavedJobCreateOrConnectWithoutUserInput = {
    where: SavedJobWhereUniqueInput
    create: XOR<SavedJobCreateWithoutUserInput, SavedJobUncheckedCreateWithoutUserInput>
  }

  export type SavedJobCreateManyUserInputEnvelope = {
    data: SavedJobCreateManyUserInput | SavedJobCreateManyUserInput[]
  }

  export type JobSearchPreferencesCreateWithoutUserInput = {
    id?: string
    desiredJobTypes: string
    minSalary?: number | null
    maxSalary?: number | null
    salaryCurrency?: string
    salaryPeriod?: string
    desiredLocations?: string | null
    isRemoteOnly?: boolean
    isWillingToRelocate?: boolean
    maxCommuteMiles?: number | null
    desiredRoles: string
    desiredSkills: string
    yearsOfExperience?: string | null
    desiredIndustries: string
    minCompanySize?: number | null
    maxCompanySize?: number | null
    excludedCompanies: string
    isSearchActive?: boolean
    lastSearchDate?: Date | string | null
    savedSearches?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type JobSearchPreferencesUncheckedCreateWithoutUserInput = {
    id?: string
    desiredJobTypes: string
    minSalary?: number | null
    maxSalary?: number | null
    salaryCurrency?: string
    salaryPeriod?: string
    desiredLocations?: string | null
    isRemoteOnly?: boolean
    isWillingToRelocate?: boolean
    maxCommuteMiles?: number | null
    desiredRoles: string
    desiredSkills: string
    yearsOfExperience?: string | null
    desiredIndustries: string
    minCompanySize?: number | null
    maxCompanySize?: number | null
    excludedCompanies: string
    isSearchActive?: boolean
    lastSearchDate?: Date | string | null
    savedSearches?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type JobSearchPreferencesCreateOrConnectWithoutUserInput = {
    where: JobSearchPreferencesWhereUniqueInput
    create: XOR<JobSearchPreferencesCreateWithoutUserInput, JobSearchPreferencesUncheckedCreateWithoutUserInput>
  }

  export type NotificationPreferencesCreateWithoutUserInput = {
    id?: string
    jobMatches?: boolean
    applications?: boolean
    interviews?: boolean
    messages?: boolean
    emailEnabled?: boolean
    pushEnabled?: boolean
    quietHours?: string | null
    frequency?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotificationPreferencesUncheckedCreateWithoutUserInput = {
    id?: string
    jobMatches?: boolean
    applications?: boolean
    interviews?: boolean
    messages?: boolean
    emailEnabled?: boolean
    pushEnabled?: boolean
    quietHours?: string | null
    frequency?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotificationPreferencesCreateOrConnectWithoutUserInput = {
    where: NotificationPreferencesWhereUniqueInput
    create: XOR<NotificationPreferencesCreateWithoutUserInput, NotificationPreferencesUncheckedCreateWithoutUserInput>
  }

  export type FCMTokenCreateWithoutUserInput = {
    id?: string
    token: string
    platform: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FCMTokenUncheckedCreateWithoutUserInput = {
    id?: string
    token: string
    platform: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FCMTokenCreateOrConnectWithoutUserInput = {
    where: FCMTokenWhereUniqueInput
    create: XOR<FCMTokenCreateWithoutUserInput, FCMTokenUncheckedCreateWithoutUserInput>
  }

  export type FCMTokenCreateManyUserInputEnvelope = {
    data: FCMTokenCreateManyUserInput | FCMTokenCreateManyUserInput[]
  }

  export type ProfileUpsertWithWhereUniqueWithoutUserInput = {
    where: ProfileWhereUniqueInput
    update: XOR<ProfileUpdateWithoutUserInput, ProfileUncheckedUpdateWithoutUserInput>
    create: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput>
  }

  export type ProfileUpdateWithWhereUniqueWithoutUserInput = {
    where: ProfileWhereUniqueInput
    data: XOR<ProfileUpdateWithoutUserInput, ProfileUncheckedUpdateWithoutUserInput>
  }

  export type ProfileUpdateManyWithWhereWithoutUserInput = {
    where: ProfileScalarWhereInput
    data: XOR<ProfileUpdateManyMutationInput, ProfileUncheckedUpdateManyWithoutUserInput>
  }

  export type ProfileScalarWhereInput = {
    AND?: ProfileScalarWhereInput | ProfileScalarWhereInput[]
    OR?: ProfileScalarWhereInput[]
    NOT?: ProfileScalarWhereInput | ProfileScalarWhereInput[]
    id?: StringFilter<"Profile"> | string
    userId?: StringFilter<"Profile"> | string
    jobRoleId?: StringNullableFilter<"Profile"> | string | null
    fullName?: StringNullableFilter<"Profile"> | string | null
    email?: StringNullableFilter<"Profile"> | string | null
    bio?: StringNullableFilter<"Profile"> | string | null
    location?: StringNullableFilter<"Profile"> | string | null
    expectedSalary?: StringNullableFilter<"Profile"> | string | null
    yearsOfExperience?: StringNullableFilter<"Profile"> | string | null
    availableToStart?: StringNullableFilter<"Profile"> | string | null
    immediateJoiner?: BoolNullableFilter<"Profile"> | boolean | null
    preferredRole?: StringNullableFilter<"Profile"> | string | null
    profilePicture?: StringNullableFilter<"Profile"> | string | null
    cvLink?: StringNullableFilter<"Profile"> | string | null
    createdAt?: DateTimeFilter<"Profile"> | Date | string
    updatedAt?: DateTimeFilter<"Profile"> | Date | string
  }

  export type SavedJobUpsertWithWhereUniqueWithoutUserInput = {
    where: SavedJobWhereUniqueInput
    update: XOR<SavedJobUpdateWithoutUserInput, SavedJobUncheckedUpdateWithoutUserInput>
    create: XOR<SavedJobCreateWithoutUserInput, SavedJobUncheckedCreateWithoutUserInput>
  }

  export type SavedJobUpdateWithWhereUniqueWithoutUserInput = {
    where: SavedJobWhereUniqueInput
    data: XOR<SavedJobUpdateWithoutUserInput, SavedJobUncheckedUpdateWithoutUserInput>
  }

  export type SavedJobUpdateManyWithWhereWithoutUserInput = {
    where: SavedJobScalarWhereInput
    data: XOR<SavedJobUpdateManyMutationInput, SavedJobUncheckedUpdateManyWithoutUserInput>
  }

  export type SavedJobScalarWhereInput = {
    AND?: SavedJobScalarWhereInput | SavedJobScalarWhereInput[]
    OR?: SavedJobScalarWhereInput[]
    NOT?: SavedJobScalarWhereInput | SavedJobScalarWhereInput[]
    id?: StringFilter<"SavedJob"> | string
    userId?: StringFilter<"SavedJob"> | string
    jobId?: StringFilter<"SavedJob"> | string
    createdAt?: DateTimeFilter<"SavedJob"> | Date | string
  }

  export type JobSearchPreferencesUpsertWithoutUserInput = {
    update: XOR<JobSearchPreferencesUpdateWithoutUserInput, JobSearchPreferencesUncheckedUpdateWithoutUserInput>
    create: XOR<JobSearchPreferencesCreateWithoutUserInput, JobSearchPreferencesUncheckedCreateWithoutUserInput>
    where?: JobSearchPreferencesWhereInput
  }

  export type JobSearchPreferencesUpdateToOneWithWhereWithoutUserInput = {
    where?: JobSearchPreferencesWhereInput
    data: XOR<JobSearchPreferencesUpdateWithoutUserInput, JobSearchPreferencesUncheckedUpdateWithoutUserInput>
  }

  export type JobSearchPreferencesUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    desiredJobTypes?: StringFieldUpdateOperationsInput | string
    minSalary?: NullableIntFieldUpdateOperationsInput | number | null
    maxSalary?: NullableIntFieldUpdateOperationsInput | number | null
    salaryCurrency?: StringFieldUpdateOperationsInput | string
    salaryPeriod?: StringFieldUpdateOperationsInput | string
    desiredLocations?: NullableStringFieldUpdateOperationsInput | string | null
    isRemoteOnly?: BoolFieldUpdateOperationsInput | boolean
    isWillingToRelocate?: BoolFieldUpdateOperationsInput | boolean
    maxCommuteMiles?: NullableIntFieldUpdateOperationsInput | number | null
    desiredRoles?: StringFieldUpdateOperationsInput | string
    desiredSkills?: StringFieldUpdateOperationsInput | string
    yearsOfExperience?: NullableStringFieldUpdateOperationsInput | string | null
    desiredIndustries?: StringFieldUpdateOperationsInput | string
    minCompanySize?: NullableIntFieldUpdateOperationsInput | number | null
    maxCompanySize?: NullableIntFieldUpdateOperationsInput | number | null
    excludedCompanies?: StringFieldUpdateOperationsInput | string
    isSearchActive?: BoolFieldUpdateOperationsInput | boolean
    lastSearchDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    savedSearches?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobSearchPreferencesUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    desiredJobTypes?: StringFieldUpdateOperationsInput | string
    minSalary?: NullableIntFieldUpdateOperationsInput | number | null
    maxSalary?: NullableIntFieldUpdateOperationsInput | number | null
    salaryCurrency?: StringFieldUpdateOperationsInput | string
    salaryPeriod?: StringFieldUpdateOperationsInput | string
    desiredLocations?: NullableStringFieldUpdateOperationsInput | string | null
    isRemoteOnly?: BoolFieldUpdateOperationsInput | boolean
    isWillingToRelocate?: BoolFieldUpdateOperationsInput | boolean
    maxCommuteMiles?: NullableIntFieldUpdateOperationsInput | number | null
    desiredRoles?: StringFieldUpdateOperationsInput | string
    desiredSkills?: StringFieldUpdateOperationsInput | string
    yearsOfExperience?: NullableStringFieldUpdateOperationsInput | string | null
    desiredIndustries?: StringFieldUpdateOperationsInput | string
    minCompanySize?: NullableIntFieldUpdateOperationsInput | number | null
    maxCompanySize?: NullableIntFieldUpdateOperationsInput | number | null
    excludedCompanies?: StringFieldUpdateOperationsInput | string
    isSearchActive?: BoolFieldUpdateOperationsInput | boolean
    lastSearchDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    savedSearches?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationPreferencesUpsertWithoutUserInput = {
    update: XOR<NotificationPreferencesUpdateWithoutUserInput, NotificationPreferencesUncheckedUpdateWithoutUserInput>
    create: XOR<NotificationPreferencesCreateWithoutUserInput, NotificationPreferencesUncheckedCreateWithoutUserInput>
    where?: NotificationPreferencesWhereInput
  }

  export type NotificationPreferencesUpdateToOneWithWhereWithoutUserInput = {
    where?: NotificationPreferencesWhereInput
    data: XOR<NotificationPreferencesUpdateWithoutUserInput, NotificationPreferencesUncheckedUpdateWithoutUserInput>
  }

  export type NotificationPreferencesUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobMatches?: BoolFieldUpdateOperationsInput | boolean
    applications?: BoolFieldUpdateOperationsInput | boolean
    interviews?: BoolFieldUpdateOperationsInput | boolean
    messages?: BoolFieldUpdateOperationsInput | boolean
    emailEnabled?: BoolFieldUpdateOperationsInput | boolean
    pushEnabled?: BoolFieldUpdateOperationsInput | boolean
    quietHours?: NullableStringFieldUpdateOperationsInput | string | null
    frequency?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationPreferencesUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobMatches?: BoolFieldUpdateOperationsInput | boolean
    applications?: BoolFieldUpdateOperationsInput | boolean
    interviews?: BoolFieldUpdateOperationsInput | boolean
    messages?: BoolFieldUpdateOperationsInput | boolean
    emailEnabled?: BoolFieldUpdateOperationsInput | boolean
    pushEnabled?: BoolFieldUpdateOperationsInput | boolean
    quietHours?: NullableStringFieldUpdateOperationsInput | string | null
    frequency?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FCMTokenUpsertWithWhereUniqueWithoutUserInput = {
    where: FCMTokenWhereUniqueInput
    update: XOR<FCMTokenUpdateWithoutUserInput, FCMTokenUncheckedUpdateWithoutUserInput>
    create: XOR<FCMTokenCreateWithoutUserInput, FCMTokenUncheckedCreateWithoutUserInput>
  }

  export type FCMTokenUpdateWithWhereUniqueWithoutUserInput = {
    where: FCMTokenWhereUniqueInput
    data: XOR<FCMTokenUpdateWithoutUserInput, FCMTokenUncheckedUpdateWithoutUserInput>
  }

  export type FCMTokenUpdateManyWithWhereWithoutUserInput = {
    where: FCMTokenScalarWhereInput
    data: XOR<FCMTokenUpdateManyMutationInput, FCMTokenUncheckedUpdateManyWithoutUserInput>
  }

  export type FCMTokenScalarWhereInput = {
    AND?: FCMTokenScalarWhereInput | FCMTokenScalarWhereInput[]
    OR?: FCMTokenScalarWhereInput[]
    NOT?: FCMTokenScalarWhereInput | FCMTokenScalarWhereInput[]
    id?: StringFilter<"FCMToken"> | string
    userId?: StringFilter<"FCMToken"> | string
    token?: StringFilter<"FCMToken"> | string
    platform?: StringFilter<"FCMToken"> | string
    createdAt?: DateTimeFilter<"FCMToken"> | Date | string
    updatedAt?: DateTimeFilter<"FCMToken"> | Date | string
  }

  export type UserCreateWithoutProfilesInput = {
    id?: string
    phoneNumber: string
    countryCode: string
    createdAt?: Date | string
    updatedAt?: Date | string
    savedJobs?: SavedJobCreateNestedManyWithoutUserInput
    jobSearchPreferences?: JobSearchPreferencesCreateNestedOneWithoutUserInput
    notificationPreferences?: NotificationPreferencesCreateNestedOneWithoutUserInput
    fcmTokens?: FCMTokenCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutProfilesInput = {
    id?: string
    phoneNumber: string
    countryCode: string
    createdAt?: Date | string
    updatedAt?: Date | string
    savedJobs?: SavedJobUncheckedCreateNestedManyWithoutUserInput
    jobSearchPreferences?: JobSearchPreferencesUncheckedCreateNestedOneWithoutUserInput
    notificationPreferences?: NotificationPreferencesUncheckedCreateNestedOneWithoutUserInput
    fcmTokens?: FCMTokenUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutProfilesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProfilesInput, UserUncheckedCreateWithoutProfilesInput>
  }

  export type EducationCreateWithoutProfileInput = {
    id?: string
    degree: string
    institution: string
    location?: string | null
    startDate: string
    endDate?: string | null
    grade?: string | null
    description?: string | null
    isCurrent: boolean
  }

  export type EducationUncheckedCreateWithoutProfileInput = {
    id?: string
    degree: string
    institution: string
    location?: string | null
    startDate: string
    endDate?: string | null
    grade?: string | null
    description?: string | null
    isCurrent: boolean
  }

  export type EducationCreateOrConnectWithoutProfileInput = {
    where: EducationWhereUniqueInput
    create: XOR<EducationCreateWithoutProfileInput, EducationUncheckedCreateWithoutProfileInput>
  }

  export type EducationCreateManyProfileInputEnvelope = {
    data: EducationCreateManyProfileInput | EducationCreateManyProfileInput[]
  }

  export type ExperienceCreateWithoutProfileInput = {
    id?: string
    jobRoleId?: string | null
    companyId: string
    location?: string | null
    startDate: string
    endDate?: string | null
    isCurrent: boolean
    rolesAndResponsibilities?: string | null
  }

  export type ExperienceUncheckedCreateWithoutProfileInput = {
    id?: string
    jobRoleId?: string | null
    companyId: string
    location?: string | null
    startDate: string
    endDate?: string | null
    isCurrent: boolean
    rolesAndResponsibilities?: string | null
  }

  export type ExperienceCreateOrConnectWithoutProfileInput = {
    where: ExperienceWhereUniqueInput
    create: XOR<ExperienceCreateWithoutProfileInput, ExperienceUncheckedCreateWithoutProfileInput>
  }

  export type ExperienceCreateManyProfileInputEnvelope = {
    data: ExperienceCreateManyProfileInput | ExperienceCreateManyProfileInput[]
  }

  export type SkillUserMapCreateWithoutProfileInput = {
    id?: string
    skillId: string
    createdAt?: Date | string
  }

  export type SkillUserMapUncheckedCreateWithoutProfileInput = {
    id?: string
    skillId: string
    createdAt?: Date | string
  }

  export type SkillUserMapCreateOrConnectWithoutProfileInput = {
    where: SkillUserMapWhereUniqueInput
    create: XOR<SkillUserMapCreateWithoutProfileInput, SkillUserMapUncheckedCreateWithoutProfileInput>
  }

  export type SkillUserMapCreateManyProfileInputEnvelope = {
    data: SkillUserMapCreateManyProfileInput | SkillUserMapCreateManyProfileInput[]
  }

  export type ResumeCreateWithoutProfileInput = {
    id?: string
    title: string
    fileName: string
    fileUrl: string
    fileSize?: number | null
    mimeType: string
    isDefault?: boolean
    isActive?: boolean
    uploadedAt?: Date | string
    updatedAt?: Date | string
  }

  export type ResumeUncheckedCreateWithoutProfileInput = {
    id?: string
    title: string
    fileName: string
    fileUrl: string
    fileSize?: number | null
    mimeType: string
    isDefault?: boolean
    isActive?: boolean
    uploadedAt?: Date | string
    updatedAt?: Date | string
  }

  export type ResumeCreateOrConnectWithoutProfileInput = {
    where: ResumeWhereUniqueInput
    create: XOR<ResumeCreateWithoutProfileInput, ResumeUncheckedCreateWithoutProfileInput>
  }

  export type ResumeCreateManyProfileInputEnvelope = {
    data: ResumeCreateManyProfileInput | ResumeCreateManyProfileInput[]
  }

  export type UserUpsertWithoutProfilesInput = {
    update: XOR<UserUpdateWithoutProfilesInput, UserUncheckedUpdateWithoutProfilesInput>
    create: XOR<UserCreateWithoutProfilesInput, UserUncheckedCreateWithoutProfilesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProfilesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProfilesInput, UserUncheckedUpdateWithoutProfilesInput>
  }

  export type UserUpdateWithoutProfilesInput = {
    id?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    countryCode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    savedJobs?: SavedJobUpdateManyWithoutUserNestedInput
    jobSearchPreferences?: JobSearchPreferencesUpdateOneWithoutUserNestedInput
    notificationPreferences?: NotificationPreferencesUpdateOneWithoutUserNestedInput
    fcmTokens?: FCMTokenUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutProfilesInput = {
    id?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    countryCode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    savedJobs?: SavedJobUncheckedUpdateManyWithoutUserNestedInput
    jobSearchPreferences?: JobSearchPreferencesUncheckedUpdateOneWithoutUserNestedInput
    notificationPreferences?: NotificationPreferencesUncheckedUpdateOneWithoutUserNestedInput
    fcmTokens?: FCMTokenUncheckedUpdateManyWithoutUserNestedInput
  }

  export type EducationUpsertWithWhereUniqueWithoutProfileInput = {
    where: EducationWhereUniqueInput
    update: XOR<EducationUpdateWithoutProfileInput, EducationUncheckedUpdateWithoutProfileInput>
    create: XOR<EducationCreateWithoutProfileInput, EducationUncheckedCreateWithoutProfileInput>
  }

  export type EducationUpdateWithWhereUniqueWithoutProfileInput = {
    where: EducationWhereUniqueInput
    data: XOR<EducationUpdateWithoutProfileInput, EducationUncheckedUpdateWithoutProfileInput>
  }

  export type EducationUpdateManyWithWhereWithoutProfileInput = {
    where: EducationScalarWhereInput
    data: XOR<EducationUpdateManyMutationInput, EducationUncheckedUpdateManyWithoutProfileInput>
  }

  export type EducationScalarWhereInput = {
    AND?: EducationScalarWhereInput | EducationScalarWhereInput[]
    OR?: EducationScalarWhereInput[]
    NOT?: EducationScalarWhereInput | EducationScalarWhereInput[]
    id?: StringFilter<"Education"> | string
    profileId?: StringFilter<"Education"> | string
    degree?: StringFilter<"Education"> | string
    institution?: StringFilter<"Education"> | string
    location?: StringNullableFilter<"Education"> | string | null
    startDate?: StringFilter<"Education"> | string
    endDate?: StringNullableFilter<"Education"> | string | null
    grade?: StringNullableFilter<"Education"> | string | null
    description?: StringNullableFilter<"Education"> | string | null
    isCurrent?: BoolFilter<"Education"> | boolean
  }

  export type ExperienceUpsertWithWhereUniqueWithoutProfileInput = {
    where: ExperienceWhereUniqueInput
    update: XOR<ExperienceUpdateWithoutProfileInput, ExperienceUncheckedUpdateWithoutProfileInput>
    create: XOR<ExperienceCreateWithoutProfileInput, ExperienceUncheckedCreateWithoutProfileInput>
  }

  export type ExperienceUpdateWithWhereUniqueWithoutProfileInput = {
    where: ExperienceWhereUniqueInput
    data: XOR<ExperienceUpdateWithoutProfileInput, ExperienceUncheckedUpdateWithoutProfileInput>
  }

  export type ExperienceUpdateManyWithWhereWithoutProfileInput = {
    where: ExperienceScalarWhereInput
    data: XOR<ExperienceUpdateManyMutationInput, ExperienceUncheckedUpdateManyWithoutProfileInput>
  }

  export type ExperienceScalarWhereInput = {
    AND?: ExperienceScalarWhereInput | ExperienceScalarWhereInput[]
    OR?: ExperienceScalarWhereInput[]
    NOT?: ExperienceScalarWhereInput | ExperienceScalarWhereInput[]
    id?: StringFilter<"Experience"> | string
    profileId?: StringFilter<"Experience"> | string
    jobRoleId?: StringNullableFilter<"Experience"> | string | null
    companyId?: StringFilter<"Experience"> | string
    location?: StringNullableFilter<"Experience"> | string | null
    startDate?: StringFilter<"Experience"> | string
    endDate?: StringNullableFilter<"Experience"> | string | null
    isCurrent?: BoolFilter<"Experience"> | boolean
    rolesAndResponsibilities?: StringNullableFilter<"Experience"> | string | null
  }

  export type SkillUserMapUpsertWithWhereUniqueWithoutProfileInput = {
    where: SkillUserMapWhereUniqueInput
    update: XOR<SkillUserMapUpdateWithoutProfileInput, SkillUserMapUncheckedUpdateWithoutProfileInput>
    create: XOR<SkillUserMapCreateWithoutProfileInput, SkillUserMapUncheckedCreateWithoutProfileInput>
  }

  export type SkillUserMapUpdateWithWhereUniqueWithoutProfileInput = {
    where: SkillUserMapWhereUniqueInput
    data: XOR<SkillUserMapUpdateWithoutProfileInput, SkillUserMapUncheckedUpdateWithoutProfileInput>
  }

  export type SkillUserMapUpdateManyWithWhereWithoutProfileInput = {
    where: SkillUserMapScalarWhereInput
    data: XOR<SkillUserMapUpdateManyMutationInput, SkillUserMapUncheckedUpdateManyWithoutProfileInput>
  }

  export type SkillUserMapScalarWhereInput = {
    AND?: SkillUserMapScalarWhereInput | SkillUserMapScalarWhereInput[]
    OR?: SkillUserMapScalarWhereInput[]
    NOT?: SkillUserMapScalarWhereInput | SkillUserMapScalarWhereInput[]
    id?: StringFilter<"SkillUserMap"> | string
    skillId?: StringFilter<"SkillUserMap"> | string
    profileId?: StringFilter<"SkillUserMap"> | string
    createdAt?: DateTimeFilter<"SkillUserMap"> | Date | string
  }

  export type ResumeUpsertWithWhereUniqueWithoutProfileInput = {
    where: ResumeWhereUniqueInput
    update: XOR<ResumeUpdateWithoutProfileInput, ResumeUncheckedUpdateWithoutProfileInput>
    create: XOR<ResumeCreateWithoutProfileInput, ResumeUncheckedCreateWithoutProfileInput>
  }

  export type ResumeUpdateWithWhereUniqueWithoutProfileInput = {
    where: ResumeWhereUniqueInput
    data: XOR<ResumeUpdateWithoutProfileInput, ResumeUncheckedUpdateWithoutProfileInput>
  }

  export type ResumeUpdateManyWithWhereWithoutProfileInput = {
    where: ResumeScalarWhereInput
    data: XOR<ResumeUpdateManyMutationInput, ResumeUncheckedUpdateManyWithoutProfileInput>
  }

  export type ResumeScalarWhereInput = {
    AND?: ResumeScalarWhereInput | ResumeScalarWhereInput[]
    OR?: ResumeScalarWhereInput[]
    NOT?: ResumeScalarWhereInput | ResumeScalarWhereInput[]
    id?: StringFilter<"Resume"> | string
    profileId?: StringFilter<"Resume"> | string
    title?: StringFilter<"Resume"> | string
    fileName?: StringFilter<"Resume"> | string
    fileUrl?: StringFilter<"Resume"> | string
    fileSize?: IntNullableFilter<"Resume"> | number | null
    mimeType?: StringFilter<"Resume"> | string
    isDefault?: BoolFilter<"Resume"> | boolean
    isActive?: BoolFilter<"Resume"> | boolean
    uploadedAt?: DateTimeFilter<"Resume"> | Date | string
    updatedAt?: DateTimeFilter<"Resume"> | Date | string
  }

  export type RecruiterVerificationMethodsCreateWithoutRecruiterProfileInput = {
    id?: string
    method: string
  }

  export type RecruiterVerificationMethodsUncheckedCreateWithoutRecruiterProfileInput = {
    id?: string
    method: string
  }

  export type RecruiterVerificationMethodsCreateOrConnectWithoutRecruiterProfileInput = {
    where: RecruiterVerificationMethodsWhereUniqueInput
    create: XOR<RecruiterVerificationMethodsCreateWithoutRecruiterProfileInput, RecruiterVerificationMethodsUncheckedCreateWithoutRecruiterProfileInput>
  }

  export type RecruiterVerificationMethodsUpsertWithoutRecruiterProfileInput = {
    update: XOR<RecruiterVerificationMethodsUpdateWithoutRecruiterProfileInput, RecruiterVerificationMethodsUncheckedUpdateWithoutRecruiterProfileInput>
    create: XOR<RecruiterVerificationMethodsCreateWithoutRecruiterProfileInput, RecruiterVerificationMethodsUncheckedCreateWithoutRecruiterProfileInput>
    where?: RecruiterVerificationMethodsWhereInput
  }

  export type RecruiterVerificationMethodsUpdateToOneWithWhereWithoutRecruiterProfileInput = {
    where?: RecruiterVerificationMethodsWhereInput
    data: XOR<RecruiterVerificationMethodsUpdateWithoutRecruiterProfileInput, RecruiterVerificationMethodsUncheckedUpdateWithoutRecruiterProfileInput>
  }

  export type RecruiterVerificationMethodsUpdateWithoutRecruiterProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    method?: StringFieldUpdateOperationsInput | string
  }

  export type RecruiterVerificationMethodsUncheckedUpdateWithoutRecruiterProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    method?: StringFieldUpdateOperationsInput | string
  }

  export type RecruiterProfileCreateWithoutRecruiterVerificationMethodsInput = {
    id?: string
    userId: string
    fullName?: string | null
    companyId?: string | null
    jobRoleId?: string | null
    workEmail?: string | null
    location?: string | null
    isVerified?: boolean
    verifiedBy?: string | null
    verificationDetails?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RecruiterProfileUncheckedCreateWithoutRecruiterVerificationMethodsInput = {
    id?: string
    userId: string
    fullName?: string | null
    companyId?: string | null
    jobRoleId?: string | null
    workEmail?: string | null
    location?: string | null
    isVerified?: boolean
    verifiedBy?: string | null
    verificationDetails?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RecruiterProfileCreateOrConnectWithoutRecruiterVerificationMethodsInput = {
    where: RecruiterProfileWhereUniqueInput
    create: XOR<RecruiterProfileCreateWithoutRecruiterVerificationMethodsInput, RecruiterProfileUncheckedCreateWithoutRecruiterVerificationMethodsInput>
  }

  export type RecruiterProfileCreateManyRecruiterVerificationMethodsInputEnvelope = {
    data: RecruiterProfileCreateManyRecruiterVerificationMethodsInput | RecruiterProfileCreateManyRecruiterVerificationMethodsInput[]
  }

  export type RecruiterProfileUpsertWithWhereUniqueWithoutRecruiterVerificationMethodsInput = {
    where: RecruiterProfileWhereUniqueInput
    update: XOR<RecruiterProfileUpdateWithoutRecruiterVerificationMethodsInput, RecruiterProfileUncheckedUpdateWithoutRecruiterVerificationMethodsInput>
    create: XOR<RecruiterProfileCreateWithoutRecruiterVerificationMethodsInput, RecruiterProfileUncheckedCreateWithoutRecruiterVerificationMethodsInput>
  }

  export type RecruiterProfileUpdateWithWhereUniqueWithoutRecruiterVerificationMethodsInput = {
    where: RecruiterProfileWhereUniqueInput
    data: XOR<RecruiterProfileUpdateWithoutRecruiterVerificationMethodsInput, RecruiterProfileUncheckedUpdateWithoutRecruiterVerificationMethodsInput>
  }

  export type RecruiterProfileUpdateManyWithWhereWithoutRecruiterVerificationMethodsInput = {
    where: RecruiterProfileScalarWhereInput
    data: XOR<RecruiterProfileUpdateManyMutationInput, RecruiterProfileUncheckedUpdateManyWithoutRecruiterVerificationMethodsInput>
  }

  export type RecruiterProfileScalarWhereInput = {
    AND?: RecruiterProfileScalarWhereInput | RecruiterProfileScalarWhereInput[]
    OR?: RecruiterProfileScalarWhereInput[]
    NOT?: RecruiterProfileScalarWhereInput | RecruiterProfileScalarWhereInput[]
    id?: StringFilter<"RecruiterProfile"> | string
    userId?: StringFilter<"RecruiterProfile"> | string
    fullName?: StringNullableFilter<"RecruiterProfile"> | string | null
    companyId?: StringNullableFilter<"RecruiterProfile"> | string | null
    jobRoleId?: StringNullableFilter<"RecruiterProfile"> | string | null
    workEmail?: StringNullableFilter<"RecruiterProfile"> | string | null
    location?: StringNullableFilter<"RecruiterProfile"> | string | null
    isVerified?: BoolFilter<"RecruiterProfile"> | boolean
    recruiterVerificationMethodsId?: StringNullableFilter<"RecruiterProfile"> | string | null
    verifiedBy?: StringNullableFilter<"RecruiterProfile"> | string | null
    verificationDetails?: StringNullableFilter<"RecruiterProfile"> | string | null
    createdAt?: DateTimeFilter<"RecruiterProfile"> | Date | string
    updatedAt?: DateTimeFilter<"RecruiterProfile"> | Date | string
  }

  export type UserCreateWithoutSavedJobsInput = {
    id?: string
    phoneNumber: string
    countryCode: string
    createdAt?: Date | string
    updatedAt?: Date | string
    profiles?: ProfileCreateNestedManyWithoutUserInput
    jobSearchPreferences?: JobSearchPreferencesCreateNestedOneWithoutUserInput
    notificationPreferences?: NotificationPreferencesCreateNestedOneWithoutUserInput
    fcmTokens?: FCMTokenCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSavedJobsInput = {
    id?: string
    phoneNumber: string
    countryCode: string
    createdAt?: Date | string
    updatedAt?: Date | string
    profiles?: ProfileUncheckedCreateNestedManyWithoutUserInput
    jobSearchPreferences?: JobSearchPreferencesUncheckedCreateNestedOneWithoutUserInput
    notificationPreferences?: NotificationPreferencesUncheckedCreateNestedOneWithoutUserInput
    fcmTokens?: FCMTokenUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSavedJobsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSavedJobsInput, UserUncheckedCreateWithoutSavedJobsInput>
  }

  export type UserUpsertWithoutSavedJobsInput = {
    update: XOR<UserUpdateWithoutSavedJobsInput, UserUncheckedUpdateWithoutSavedJobsInput>
    create: XOR<UserCreateWithoutSavedJobsInput, UserUncheckedCreateWithoutSavedJobsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSavedJobsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSavedJobsInput, UserUncheckedUpdateWithoutSavedJobsInput>
  }

  export type UserUpdateWithoutSavedJobsInput = {
    id?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    countryCode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profiles?: ProfileUpdateManyWithoutUserNestedInput
    jobSearchPreferences?: JobSearchPreferencesUpdateOneWithoutUserNestedInput
    notificationPreferences?: NotificationPreferencesUpdateOneWithoutUserNestedInput
    fcmTokens?: FCMTokenUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSavedJobsInput = {
    id?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    countryCode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profiles?: ProfileUncheckedUpdateManyWithoutUserNestedInput
    jobSearchPreferences?: JobSearchPreferencesUncheckedUpdateOneWithoutUserNestedInput
    notificationPreferences?: NotificationPreferencesUncheckedUpdateOneWithoutUserNestedInput
    fcmTokens?: FCMTokenUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ProfileCreateWithoutSkillUserMapInput = {
    id?: string
    jobRoleId?: string | null
    fullName?: string | null
    email?: string | null
    bio?: string | null
    location?: string | null
    expectedSalary?: string | null
    yearsOfExperience?: string | null
    availableToStart?: string | null
    immediateJoiner?: boolean | null
    preferredRole?: string | null
    profilePicture?: string | null
    cvLink?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutProfilesInput
    education?: EducationCreateNestedManyWithoutProfileInput
    experience?: ExperienceCreateNestedManyWithoutProfileInput
    resumes?: ResumeCreateNestedManyWithoutProfileInput
  }

  export type ProfileUncheckedCreateWithoutSkillUserMapInput = {
    id?: string
    userId: string
    jobRoleId?: string | null
    fullName?: string | null
    email?: string | null
    bio?: string | null
    location?: string | null
    expectedSalary?: string | null
    yearsOfExperience?: string | null
    availableToStart?: string | null
    immediateJoiner?: boolean | null
    preferredRole?: string | null
    profilePicture?: string | null
    cvLink?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    education?: EducationUncheckedCreateNestedManyWithoutProfileInput
    experience?: ExperienceUncheckedCreateNestedManyWithoutProfileInput
    resumes?: ResumeUncheckedCreateNestedManyWithoutProfileInput
  }

  export type ProfileCreateOrConnectWithoutSkillUserMapInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutSkillUserMapInput, ProfileUncheckedCreateWithoutSkillUserMapInput>
  }

  export type ProfileUpsertWithoutSkillUserMapInput = {
    update: XOR<ProfileUpdateWithoutSkillUserMapInput, ProfileUncheckedUpdateWithoutSkillUserMapInput>
    create: XOR<ProfileCreateWithoutSkillUserMapInput, ProfileUncheckedCreateWithoutSkillUserMapInput>
    where?: ProfileWhereInput
  }

  export type ProfileUpdateToOneWithWhereWithoutSkillUserMapInput = {
    where?: ProfileWhereInput
    data: XOR<ProfileUpdateWithoutSkillUserMapInput, ProfileUncheckedUpdateWithoutSkillUserMapInput>
  }

  export type ProfileUpdateWithoutSkillUserMapInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobRoleId?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    expectedSalary?: NullableStringFieldUpdateOperationsInput | string | null
    yearsOfExperience?: NullableStringFieldUpdateOperationsInput | string | null
    availableToStart?: NullableStringFieldUpdateOperationsInput | string | null
    immediateJoiner?: NullableBoolFieldUpdateOperationsInput | boolean | null
    preferredRole?: NullableStringFieldUpdateOperationsInput | string | null
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    cvLink?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutProfilesNestedInput
    education?: EducationUpdateManyWithoutProfileNestedInput
    experience?: ExperienceUpdateManyWithoutProfileNestedInput
    resumes?: ResumeUpdateManyWithoutProfileNestedInput
  }

  export type ProfileUncheckedUpdateWithoutSkillUserMapInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    jobRoleId?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    expectedSalary?: NullableStringFieldUpdateOperationsInput | string | null
    yearsOfExperience?: NullableStringFieldUpdateOperationsInput | string | null
    availableToStart?: NullableStringFieldUpdateOperationsInput | string | null
    immediateJoiner?: NullableBoolFieldUpdateOperationsInput | boolean | null
    preferredRole?: NullableStringFieldUpdateOperationsInput | string | null
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    cvLink?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    education?: EducationUncheckedUpdateManyWithoutProfileNestedInput
    experience?: ExperienceUncheckedUpdateManyWithoutProfileNestedInput
    resumes?: ResumeUncheckedUpdateManyWithoutProfileNestedInput
  }

  export type ProfileCreateWithoutEducationInput = {
    id?: string
    jobRoleId?: string | null
    fullName?: string | null
    email?: string | null
    bio?: string | null
    location?: string | null
    expectedSalary?: string | null
    yearsOfExperience?: string | null
    availableToStart?: string | null
    immediateJoiner?: boolean | null
    preferredRole?: string | null
    profilePicture?: string | null
    cvLink?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutProfilesInput
    experience?: ExperienceCreateNestedManyWithoutProfileInput
    skillUserMap?: SkillUserMapCreateNestedManyWithoutProfileInput
    resumes?: ResumeCreateNestedManyWithoutProfileInput
  }

  export type ProfileUncheckedCreateWithoutEducationInput = {
    id?: string
    userId: string
    jobRoleId?: string | null
    fullName?: string | null
    email?: string | null
    bio?: string | null
    location?: string | null
    expectedSalary?: string | null
    yearsOfExperience?: string | null
    availableToStart?: string | null
    immediateJoiner?: boolean | null
    preferredRole?: string | null
    profilePicture?: string | null
    cvLink?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    experience?: ExperienceUncheckedCreateNestedManyWithoutProfileInput
    skillUserMap?: SkillUserMapUncheckedCreateNestedManyWithoutProfileInput
    resumes?: ResumeUncheckedCreateNestedManyWithoutProfileInput
  }

  export type ProfileCreateOrConnectWithoutEducationInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutEducationInput, ProfileUncheckedCreateWithoutEducationInput>
  }

  export type ProfileUpsertWithoutEducationInput = {
    update: XOR<ProfileUpdateWithoutEducationInput, ProfileUncheckedUpdateWithoutEducationInput>
    create: XOR<ProfileCreateWithoutEducationInput, ProfileUncheckedCreateWithoutEducationInput>
    where?: ProfileWhereInput
  }

  export type ProfileUpdateToOneWithWhereWithoutEducationInput = {
    where?: ProfileWhereInput
    data: XOR<ProfileUpdateWithoutEducationInput, ProfileUncheckedUpdateWithoutEducationInput>
  }

  export type ProfileUpdateWithoutEducationInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobRoleId?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    expectedSalary?: NullableStringFieldUpdateOperationsInput | string | null
    yearsOfExperience?: NullableStringFieldUpdateOperationsInput | string | null
    availableToStart?: NullableStringFieldUpdateOperationsInput | string | null
    immediateJoiner?: NullableBoolFieldUpdateOperationsInput | boolean | null
    preferredRole?: NullableStringFieldUpdateOperationsInput | string | null
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    cvLink?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutProfilesNestedInput
    experience?: ExperienceUpdateManyWithoutProfileNestedInput
    skillUserMap?: SkillUserMapUpdateManyWithoutProfileNestedInput
    resumes?: ResumeUpdateManyWithoutProfileNestedInput
  }

  export type ProfileUncheckedUpdateWithoutEducationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    jobRoleId?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    expectedSalary?: NullableStringFieldUpdateOperationsInput | string | null
    yearsOfExperience?: NullableStringFieldUpdateOperationsInput | string | null
    availableToStart?: NullableStringFieldUpdateOperationsInput | string | null
    immediateJoiner?: NullableBoolFieldUpdateOperationsInput | boolean | null
    preferredRole?: NullableStringFieldUpdateOperationsInput | string | null
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    cvLink?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    experience?: ExperienceUncheckedUpdateManyWithoutProfileNestedInput
    skillUserMap?: SkillUserMapUncheckedUpdateManyWithoutProfileNestedInput
    resumes?: ResumeUncheckedUpdateManyWithoutProfileNestedInput
  }

  export type ProfileCreateWithoutExperienceInput = {
    id?: string
    jobRoleId?: string | null
    fullName?: string | null
    email?: string | null
    bio?: string | null
    location?: string | null
    expectedSalary?: string | null
    yearsOfExperience?: string | null
    availableToStart?: string | null
    immediateJoiner?: boolean | null
    preferredRole?: string | null
    profilePicture?: string | null
    cvLink?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutProfilesInput
    education?: EducationCreateNestedManyWithoutProfileInput
    skillUserMap?: SkillUserMapCreateNestedManyWithoutProfileInput
    resumes?: ResumeCreateNestedManyWithoutProfileInput
  }

  export type ProfileUncheckedCreateWithoutExperienceInput = {
    id?: string
    userId: string
    jobRoleId?: string | null
    fullName?: string | null
    email?: string | null
    bio?: string | null
    location?: string | null
    expectedSalary?: string | null
    yearsOfExperience?: string | null
    availableToStart?: string | null
    immediateJoiner?: boolean | null
    preferredRole?: string | null
    profilePicture?: string | null
    cvLink?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    education?: EducationUncheckedCreateNestedManyWithoutProfileInput
    skillUserMap?: SkillUserMapUncheckedCreateNestedManyWithoutProfileInput
    resumes?: ResumeUncheckedCreateNestedManyWithoutProfileInput
  }

  export type ProfileCreateOrConnectWithoutExperienceInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutExperienceInput, ProfileUncheckedCreateWithoutExperienceInput>
  }

  export type ProfileUpsertWithoutExperienceInput = {
    update: XOR<ProfileUpdateWithoutExperienceInput, ProfileUncheckedUpdateWithoutExperienceInput>
    create: XOR<ProfileCreateWithoutExperienceInput, ProfileUncheckedCreateWithoutExperienceInput>
    where?: ProfileWhereInput
  }

  export type ProfileUpdateToOneWithWhereWithoutExperienceInput = {
    where?: ProfileWhereInput
    data: XOR<ProfileUpdateWithoutExperienceInput, ProfileUncheckedUpdateWithoutExperienceInput>
  }

  export type ProfileUpdateWithoutExperienceInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobRoleId?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    expectedSalary?: NullableStringFieldUpdateOperationsInput | string | null
    yearsOfExperience?: NullableStringFieldUpdateOperationsInput | string | null
    availableToStart?: NullableStringFieldUpdateOperationsInput | string | null
    immediateJoiner?: NullableBoolFieldUpdateOperationsInput | boolean | null
    preferredRole?: NullableStringFieldUpdateOperationsInput | string | null
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    cvLink?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutProfilesNestedInput
    education?: EducationUpdateManyWithoutProfileNestedInput
    skillUserMap?: SkillUserMapUpdateManyWithoutProfileNestedInput
    resumes?: ResumeUpdateManyWithoutProfileNestedInput
  }

  export type ProfileUncheckedUpdateWithoutExperienceInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    jobRoleId?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    expectedSalary?: NullableStringFieldUpdateOperationsInput | string | null
    yearsOfExperience?: NullableStringFieldUpdateOperationsInput | string | null
    availableToStart?: NullableStringFieldUpdateOperationsInput | string | null
    immediateJoiner?: NullableBoolFieldUpdateOperationsInput | boolean | null
    preferredRole?: NullableStringFieldUpdateOperationsInput | string | null
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    cvLink?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    education?: EducationUncheckedUpdateManyWithoutProfileNestedInput
    skillUserMap?: SkillUserMapUncheckedUpdateManyWithoutProfileNestedInput
    resumes?: ResumeUncheckedUpdateManyWithoutProfileNestedInput
  }

  export type ProfileCreateWithoutResumesInput = {
    id?: string
    jobRoleId?: string | null
    fullName?: string | null
    email?: string | null
    bio?: string | null
    location?: string | null
    expectedSalary?: string | null
    yearsOfExperience?: string | null
    availableToStart?: string | null
    immediateJoiner?: boolean | null
    preferredRole?: string | null
    profilePicture?: string | null
    cvLink?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutProfilesInput
    education?: EducationCreateNestedManyWithoutProfileInput
    experience?: ExperienceCreateNestedManyWithoutProfileInput
    skillUserMap?: SkillUserMapCreateNestedManyWithoutProfileInput
  }

  export type ProfileUncheckedCreateWithoutResumesInput = {
    id?: string
    userId: string
    jobRoleId?: string | null
    fullName?: string | null
    email?: string | null
    bio?: string | null
    location?: string | null
    expectedSalary?: string | null
    yearsOfExperience?: string | null
    availableToStart?: string | null
    immediateJoiner?: boolean | null
    preferredRole?: string | null
    profilePicture?: string | null
    cvLink?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    education?: EducationUncheckedCreateNestedManyWithoutProfileInput
    experience?: ExperienceUncheckedCreateNestedManyWithoutProfileInput
    skillUserMap?: SkillUserMapUncheckedCreateNestedManyWithoutProfileInput
  }

  export type ProfileCreateOrConnectWithoutResumesInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutResumesInput, ProfileUncheckedCreateWithoutResumesInput>
  }

  export type ProfileUpsertWithoutResumesInput = {
    update: XOR<ProfileUpdateWithoutResumesInput, ProfileUncheckedUpdateWithoutResumesInput>
    create: XOR<ProfileCreateWithoutResumesInput, ProfileUncheckedCreateWithoutResumesInput>
    where?: ProfileWhereInput
  }

  export type ProfileUpdateToOneWithWhereWithoutResumesInput = {
    where?: ProfileWhereInput
    data: XOR<ProfileUpdateWithoutResumesInput, ProfileUncheckedUpdateWithoutResumesInput>
  }

  export type ProfileUpdateWithoutResumesInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobRoleId?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    expectedSalary?: NullableStringFieldUpdateOperationsInput | string | null
    yearsOfExperience?: NullableStringFieldUpdateOperationsInput | string | null
    availableToStart?: NullableStringFieldUpdateOperationsInput | string | null
    immediateJoiner?: NullableBoolFieldUpdateOperationsInput | boolean | null
    preferredRole?: NullableStringFieldUpdateOperationsInput | string | null
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    cvLink?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutProfilesNestedInput
    education?: EducationUpdateManyWithoutProfileNestedInput
    experience?: ExperienceUpdateManyWithoutProfileNestedInput
    skillUserMap?: SkillUserMapUpdateManyWithoutProfileNestedInput
  }

  export type ProfileUncheckedUpdateWithoutResumesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    jobRoleId?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    expectedSalary?: NullableStringFieldUpdateOperationsInput | string | null
    yearsOfExperience?: NullableStringFieldUpdateOperationsInput | string | null
    availableToStart?: NullableStringFieldUpdateOperationsInput | string | null
    immediateJoiner?: NullableBoolFieldUpdateOperationsInput | boolean | null
    preferredRole?: NullableStringFieldUpdateOperationsInput | string | null
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    cvLink?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    education?: EducationUncheckedUpdateManyWithoutProfileNestedInput
    experience?: ExperienceUncheckedUpdateManyWithoutProfileNestedInput
    skillUserMap?: SkillUserMapUncheckedUpdateManyWithoutProfileNestedInput
  }

  export type UserCreateWithoutNotificationPreferencesInput = {
    id?: string
    phoneNumber: string
    countryCode: string
    createdAt?: Date | string
    updatedAt?: Date | string
    profiles?: ProfileCreateNestedManyWithoutUserInput
    savedJobs?: SavedJobCreateNestedManyWithoutUserInput
    jobSearchPreferences?: JobSearchPreferencesCreateNestedOneWithoutUserInput
    fcmTokens?: FCMTokenCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutNotificationPreferencesInput = {
    id?: string
    phoneNumber: string
    countryCode: string
    createdAt?: Date | string
    updatedAt?: Date | string
    profiles?: ProfileUncheckedCreateNestedManyWithoutUserInput
    savedJobs?: SavedJobUncheckedCreateNestedManyWithoutUserInput
    jobSearchPreferences?: JobSearchPreferencesUncheckedCreateNestedOneWithoutUserInput
    fcmTokens?: FCMTokenUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutNotificationPreferencesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutNotificationPreferencesInput, UserUncheckedCreateWithoutNotificationPreferencesInput>
  }

  export type UserUpsertWithoutNotificationPreferencesInput = {
    update: XOR<UserUpdateWithoutNotificationPreferencesInput, UserUncheckedUpdateWithoutNotificationPreferencesInput>
    create: XOR<UserCreateWithoutNotificationPreferencesInput, UserUncheckedCreateWithoutNotificationPreferencesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutNotificationPreferencesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutNotificationPreferencesInput, UserUncheckedUpdateWithoutNotificationPreferencesInput>
  }

  export type UserUpdateWithoutNotificationPreferencesInput = {
    id?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    countryCode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profiles?: ProfileUpdateManyWithoutUserNestedInput
    savedJobs?: SavedJobUpdateManyWithoutUserNestedInput
    jobSearchPreferences?: JobSearchPreferencesUpdateOneWithoutUserNestedInput
    fcmTokens?: FCMTokenUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutNotificationPreferencesInput = {
    id?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    countryCode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profiles?: ProfileUncheckedUpdateManyWithoutUserNestedInput
    savedJobs?: SavedJobUncheckedUpdateManyWithoutUserNestedInput
    jobSearchPreferences?: JobSearchPreferencesUncheckedUpdateOneWithoutUserNestedInput
    fcmTokens?: FCMTokenUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutJobSearchPreferencesInput = {
    id?: string
    phoneNumber: string
    countryCode: string
    createdAt?: Date | string
    updatedAt?: Date | string
    profiles?: ProfileCreateNestedManyWithoutUserInput
    savedJobs?: SavedJobCreateNestedManyWithoutUserInput
    notificationPreferences?: NotificationPreferencesCreateNestedOneWithoutUserInput
    fcmTokens?: FCMTokenCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutJobSearchPreferencesInput = {
    id?: string
    phoneNumber: string
    countryCode: string
    createdAt?: Date | string
    updatedAt?: Date | string
    profiles?: ProfileUncheckedCreateNestedManyWithoutUserInput
    savedJobs?: SavedJobUncheckedCreateNestedManyWithoutUserInput
    notificationPreferences?: NotificationPreferencesUncheckedCreateNestedOneWithoutUserInput
    fcmTokens?: FCMTokenUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutJobSearchPreferencesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutJobSearchPreferencesInput, UserUncheckedCreateWithoutJobSearchPreferencesInput>
  }

  export type UserUpsertWithoutJobSearchPreferencesInput = {
    update: XOR<UserUpdateWithoutJobSearchPreferencesInput, UserUncheckedUpdateWithoutJobSearchPreferencesInput>
    create: XOR<UserCreateWithoutJobSearchPreferencesInput, UserUncheckedCreateWithoutJobSearchPreferencesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutJobSearchPreferencesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutJobSearchPreferencesInput, UserUncheckedUpdateWithoutJobSearchPreferencesInput>
  }

  export type UserUpdateWithoutJobSearchPreferencesInput = {
    id?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    countryCode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profiles?: ProfileUpdateManyWithoutUserNestedInput
    savedJobs?: SavedJobUpdateManyWithoutUserNestedInput
    notificationPreferences?: NotificationPreferencesUpdateOneWithoutUserNestedInput
    fcmTokens?: FCMTokenUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutJobSearchPreferencesInput = {
    id?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    countryCode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profiles?: ProfileUncheckedUpdateManyWithoutUserNestedInput
    savedJobs?: SavedJobUncheckedUpdateManyWithoutUserNestedInput
    notificationPreferences?: NotificationPreferencesUncheckedUpdateOneWithoutUserNestedInput
    fcmTokens?: FCMTokenUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutFcmTokensInput = {
    id?: string
    phoneNumber: string
    countryCode: string
    createdAt?: Date | string
    updatedAt?: Date | string
    profiles?: ProfileCreateNestedManyWithoutUserInput
    savedJobs?: SavedJobCreateNestedManyWithoutUserInput
    jobSearchPreferences?: JobSearchPreferencesCreateNestedOneWithoutUserInput
    notificationPreferences?: NotificationPreferencesCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutFcmTokensInput = {
    id?: string
    phoneNumber: string
    countryCode: string
    createdAt?: Date | string
    updatedAt?: Date | string
    profiles?: ProfileUncheckedCreateNestedManyWithoutUserInput
    savedJobs?: SavedJobUncheckedCreateNestedManyWithoutUserInput
    jobSearchPreferences?: JobSearchPreferencesUncheckedCreateNestedOneWithoutUserInput
    notificationPreferences?: NotificationPreferencesUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutFcmTokensInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFcmTokensInput, UserUncheckedCreateWithoutFcmTokensInput>
  }

  export type UserUpsertWithoutFcmTokensInput = {
    update: XOR<UserUpdateWithoutFcmTokensInput, UserUncheckedUpdateWithoutFcmTokensInput>
    create: XOR<UserCreateWithoutFcmTokensInput, UserUncheckedCreateWithoutFcmTokensInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFcmTokensInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFcmTokensInput, UserUncheckedUpdateWithoutFcmTokensInput>
  }

  export type UserUpdateWithoutFcmTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    countryCode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profiles?: ProfileUpdateManyWithoutUserNestedInput
    savedJobs?: SavedJobUpdateManyWithoutUserNestedInput
    jobSearchPreferences?: JobSearchPreferencesUpdateOneWithoutUserNestedInput
    notificationPreferences?: NotificationPreferencesUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutFcmTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    countryCode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profiles?: ProfileUncheckedUpdateManyWithoutUserNestedInput
    savedJobs?: SavedJobUncheckedUpdateManyWithoutUserNestedInput
    jobSearchPreferences?: JobSearchPreferencesUncheckedUpdateOneWithoutUserNestedInput
    notificationPreferences?: NotificationPreferencesUncheckedUpdateOneWithoutUserNestedInput
  }

  export type ProfileCreateManyUserInput = {
    id?: string
    jobRoleId?: string | null
    fullName?: string | null
    email?: string | null
    bio?: string | null
    location?: string | null
    expectedSalary?: string | null
    yearsOfExperience?: string | null
    availableToStart?: string | null
    immediateJoiner?: boolean | null
    preferredRole?: string | null
    profilePicture?: string | null
    cvLink?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SavedJobCreateManyUserInput = {
    id?: string
    jobId: string
    createdAt?: Date | string
  }

  export type FCMTokenCreateManyUserInput = {
    id?: string
    token: string
    platform: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProfileUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobRoleId?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    expectedSalary?: NullableStringFieldUpdateOperationsInput | string | null
    yearsOfExperience?: NullableStringFieldUpdateOperationsInput | string | null
    availableToStart?: NullableStringFieldUpdateOperationsInput | string | null
    immediateJoiner?: NullableBoolFieldUpdateOperationsInput | boolean | null
    preferredRole?: NullableStringFieldUpdateOperationsInput | string | null
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    cvLink?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    education?: EducationUpdateManyWithoutProfileNestedInput
    experience?: ExperienceUpdateManyWithoutProfileNestedInput
    skillUserMap?: SkillUserMapUpdateManyWithoutProfileNestedInput
    resumes?: ResumeUpdateManyWithoutProfileNestedInput
  }

  export type ProfileUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobRoleId?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    expectedSalary?: NullableStringFieldUpdateOperationsInput | string | null
    yearsOfExperience?: NullableStringFieldUpdateOperationsInput | string | null
    availableToStart?: NullableStringFieldUpdateOperationsInput | string | null
    immediateJoiner?: NullableBoolFieldUpdateOperationsInput | boolean | null
    preferredRole?: NullableStringFieldUpdateOperationsInput | string | null
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    cvLink?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    education?: EducationUncheckedUpdateManyWithoutProfileNestedInput
    experience?: ExperienceUncheckedUpdateManyWithoutProfileNestedInput
    skillUserMap?: SkillUserMapUncheckedUpdateManyWithoutProfileNestedInput
    resumes?: ResumeUncheckedUpdateManyWithoutProfileNestedInput
  }

  export type ProfileUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobRoleId?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    expectedSalary?: NullableStringFieldUpdateOperationsInput | string | null
    yearsOfExperience?: NullableStringFieldUpdateOperationsInput | string | null
    availableToStart?: NullableStringFieldUpdateOperationsInput | string | null
    immediateJoiner?: NullableBoolFieldUpdateOperationsInput | boolean | null
    preferredRole?: NullableStringFieldUpdateOperationsInput | string | null
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    cvLink?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SavedJobUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SavedJobUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SavedJobUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FCMTokenUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FCMTokenUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FCMTokenUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EducationCreateManyProfileInput = {
    id?: string
    degree: string
    institution: string
    location?: string | null
    startDate: string
    endDate?: string | null
    grade?: string | null
    description?: string | null
    isCurrent: boolean
  }

  export type ExperienceCreateManyProfileInput = {
    id?: string
    jobRoleId?: string | null
    companyId: string
    location?: string | null
    startDate: string
    endDate?: string | null
    isCurrent: boolean
    rolesAndResponsibilities?: string | null
  }

  export type SkillUserMapCreateManyProfileInput = {
    id?: string
    skillId: string
    createdAt?: Date | string
  }

  export type ResumeCreateManyProfileInput = {
    id?: string
    title: string
    fileName: string
    fileUrl: string
    fileSize?: number | null
    mimeType: string
    isDefault?: boolean
    isActive?: boolean
    uploadedAt?: Date | string
    updatedAt?: Date | string
  }

  export type EducationUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    degree?: StringFieldUpdateOperationsInput | string
    institution?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: StringFieldUpdateOperationsInput | string
    endDate?: NullableStringFieldUpdateOperationsInput | string | null
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
  }

  export type EducationUncheckedUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    degree?: StringFieldUpdateOperationsInput | string
    institution?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: StringFieldUpdateOperationsInput | string
    endDate?: NullableStringFieldUpdateOperationsInput | string | null
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
  }

  export type EducationUncheckedUpdateManyWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    degree?: StringFieldUpdateOperationsInput | string
    institution?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: StringFieldUpdateOperationsInput | string
    endDate?: NullableStringFieldUpdateOperationsInput | string | null
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ExperienceUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobRoleId?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: StringFieldUpdateOperationsInput | string
    endDate?: NullableStringFieldUpdateOperationsInput | string | null
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    rolesAndResponsibilities?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ExperienceUncheckedUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobRoleId?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: StringFieldUpdateOperationsInput | string
    endDate?: NullableStringFieldUpdateOperationsInput | string | null
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    rolesAndResponsibilities?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ExperienceUncheckedUpdateManyWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobRoleId?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: StringFieldUpdateOperationsInput | string
    endDate?: NullableStringFieldUpdateOperationsInput | string | null
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    rolesAndResponsibilities?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SkillUserMapUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    skillId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SkillUserMapUncheckedUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    skillId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SkillUserMapUncheckedUpdateManyWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    skillId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResumeUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    mimeType?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResumeUncheckedUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    mimeType?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResumeUncheckedUpdateManyWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    mimeType?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecruiterProfileCreateManyRecruiterVerificationMethodsInput = {
    id?: string
    userId: string
    fullName?: string | null
    companyId?: string | null
    jobRoleId?: string | null
    workEmail?: string | null
    location?: string | null
    isVerified?: boolean
    verifiedBy?: string | null
    verificationDetails?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RecruiterProfileUpdateWithoutRecruiterVerificationMethodsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    jobRoleId?: NullableStringFieldUpdateOperationsInput | string | null
    workEmail?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verifiedBy?: NullableStringFieldUpdateOperationsInput | string | null
    verificationDetails?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecruiterProfileUncheckedUpdateWithoutRecruiterVerificationMethodsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    jobRoleId?: NullableStringFieldUpdateOperationsInput | string | null
    workEmail?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verifiedBy?: NullableStringFieldUpdateOperationsInput | string | null
    verificationDetails?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecruiterProfileUncheckedUpdateManyWithoutRecruiterVerificationMethodsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    jobRoleId?: NullableStringFieldUpdateOperationsInput | string | null
    workEmail?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verifiedBy?: NullableStringFieldUpdateOperationsInput | string | null
    verificationDetails?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}