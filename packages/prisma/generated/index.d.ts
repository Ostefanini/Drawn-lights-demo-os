
/**
 * Client
**/

import * as runtime from './runtime/client.js';
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
 * Model Asset
 * 
 */
export type Asset = $Result.DefaultSelection<Prisma.$AssetPayload>
/**
 * Model Combination
 * 
 */
export type Combination = $Result.DefaultSelection<Prisma.$CombinationPayload>
/**
 * Model SecretCombination
 * 
 */
export type SecretCombination = $Result.DefaultSelection<Prisma.$SecretCombinationPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const AssetType: {
  TWO_D: 'TWO_D',
  THREE_D: 'THREE_D',
  SCRIPT: 'SCRIPT'
};

export type AssetType = (typeof AssetType)[keyof typeof AssetType]


export const AssetName: {
  TRIANGLE: 'TRIANGLE',
  SQUARE: 'SQUARE',
  CIRCLE: 'CIRCLE',
  CROSS: 'CROSS'
};

export type AssetName = (typeof AssetName)[keyof typeof AssetName]


export const Sound: {
  NONE: 'NONE',
  EMERVEILLE: 'EMERVEILLE',
  HEALING: 'HEALING',
  GLOSSY: 'GLOSSY'
};

export type Sound = (typeof Sound)[keyof typeof Sound]

}

export type AssetType = $Enums.AssetType

export const AssetType: typeof $Enums.AssetType

export type AssetName = $Enums.AssetName

export const AssetName: typeof $Enums.AssetName

export type Sound = $Enums.Sound

export const Sound: typeof $Enums.Sound

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
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
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
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
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

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
   * `prisma.asset`: Exposes CRUD operations for the **Asset** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Assets
    * const assets = await prisma.asset.findMany()
    * ```
    */
  get asset(): Prisma.AssetDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.combination`: Exposes CRUD operations for the **Combination** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Combinations
    * const combinations = await prisma.combination.findMany()
    * ```
    */
  get combination(): Prisma.CombinationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.secretCombination`: Exposes CRUD operations for the **SecretCombination** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SecretCombinations
    * const secretCombinations = await prisma.secretCombination.findMany()
    * ```
    */
  get secretCombination(): Prisma.SecretCombinationDelegate<ExtArgs, ClientOptions>;
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
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
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
    Asset: 'Asset',
    Combination: 'Combination',
    SecretCombination: 'SecretCombination'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "asset" | "combination" | "secretCombination"
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
      Asset: {
        payload: Prisma.$AssetPayload<ExtArgs>
        fields: Prisma.AssetFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AssetFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AssetFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetPayload>
          }
          findFirst: {
            args: Prisma.AssetFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AssetFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetPayload>
          }
          findMany: {
            args: Prisma.AssetFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetPayload>[]
          }
          create: {
            args: Prisma.AssetCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetPayload>
          }
          createMany: {
            args: Prisma.AssetCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AssetCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetPayload>[]
          }
          delete: {
            args: Prisma.AssetDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetPayload>
          }
          update: {
            args: Prisma.AssetUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetPayload>
          }
          deleteMany: {
            args: Prisma.AssetDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AssetUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AssetUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetPayload>[]
          }
          upsert: {
            args: Prisma.AssetUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetPayload>
          }
          aggregate: {
            args: Prisma.AssetAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAsset>
          }
          groupBy: {
            args: Prisma.AssetGroupByArgs<ExtArgs>
            result: $Utils.Optional<AssetGroupByOutputType>[]
          }
          count: {
            args: Prisma.AssetCountArgs<ExtArgs>
            result: $Utils.Optional<AssetCountAggregateOutputType> | number
          }
        }
      }
      Combination: {
        payload: Prisma.$CombinationPayload<ExtArgs>
        fields: Prisma.CombinationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CombinationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CombinationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CombinationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CombinationPayload>
          }
          findFirst: {
            args: Prisma.CombinationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CombinationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CombinationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CombinationPayload>
          }
          findMany: {
            args: Prisma.CombinationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CombinationPayload>[]
          }
          create: {
            args: Prisma.CombinationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CombinationPayload>
          }
          createMany: {
            args: Prisma.CombinationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CombinationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CombinationPayload>[]
          }
          delete: {
            args: Prisma.CombinationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CombinationPayload>
          }
          update: {
            args: Prisma.CombinationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CombinationPayload>
          }
          deleteMany: {
            args: Prisma.CombinationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CombinationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CombinationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CombinationPayload>[]
          }
          upsert: {
            args: Prisma.CombinationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CombinationPayload>
          }
          aggregate: {
            args: Prisma.CombinationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCombination>
          }
          groupBy: {
            args: Prisma.CombinationGroupByArgs<ExtArgs>
            result: $Utils.Optional<CombinationGroupByOutputType>[]
          }
          count: {
            args: Prisma.CombinationCountArgs<ExtArgs>
            result: $Utils.Optional<CombinationCountAggregateOutputType> | number
          }
        }
      }
      SecretCombination: {
        payload: Prisma.$SecretCombinationPayload<ExtArgs>
        fields: Prisma.SecretCombinationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SecretCombinationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecretCombinationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SecretCombinationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecretCombinationPayload>
          }
          findFirst: {
            args: Prisma.SecretCombinationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecretCombinationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SecretCombinationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecretCombinationPayload>
          }
          findMany: {
            args: Prisma.SecretCombinationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecretCombinationPayload>[]
          }
          create: {
            args: Prisma.SecretCombinationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecretCombinationPayload>
          }
          createMany: {
            args: Prisma.SecretCombinationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SecretCombinationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecretCombinationPayload>[]
          }
          delete: {
            args: Prisma.SecretCombinationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecretCombinationPayload>
          }
          update: {
            args: Prisma.SecretCombinationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecretCombinationPayload>
          }
          deleteMany: {
            args: Prisma.SecretCombinationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SecretCombinationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SecretCombinationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecretCombinationPayload>[]
          }
          upsert: {
            args: Prisma.SecretCombinationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecretCombinationPayload>
          }
          aggregate: {
            args: Prisma.SecretCombinationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSecretCombination>
          }
          groupBy: {
            args: Prisma.SecretCombinationGroupByArgs<ExtArgs>
            result: $Utils.Optional<SecretCombinationGroupByOutputType>[]
          }
          count: {
            args: Prisma.SecretCombinationCountArgs<ExtArgs>
            result: $Utils.Optional<SecretCombinationCountAggregateOutputType> | number
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
     * Read more in our [docs](https://pris.ly/d/logging).
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
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
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
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    asset?: AssetOmit
    combination?: CombinationOmit
    secretCombination?: SecretCombinationOmit
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
    combinations: number
    secretCombinations: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    combinations?: boolean | UserCountOutputTypeCountCombinationsArgs
    secretCombinations?: boolean | UserCountOutputTypeCountSecretCombinationsArgs
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
  export type UserCountOutputTypeCountCombinationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CombinationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSecretCombinationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SecretCombinationWhereInput
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
    nickname: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    nickname: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    nickname: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    nickname?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    nickname?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    nickname?: true
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
    nickname: string
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
    nickname?: boolean
    combinations?: boolean | User$combinationsArgs<ExtArgs>
    secretCombinations?: boolean | User$secretCombinationsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nickname?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nickname?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    nickname?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nickname", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    combinations?: boolean | User$combinationsArgs<ExtArgs>
    secretCombinations?: boolean | User$secretCombinationsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      combinations: Prisma.$CombinationPayload<ExtArgs>[]
      secretCombinations: Prisma.$SecretCombinationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nickname: string
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
    combinations<T extends User$combinationsArgs<ExtArgs> = {}>(args?: Subset<T, User$combinationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CombinationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    secretCombinations<T extends User$secretCombinationsArgs<ExtArgs> = {}>(args?: Subset<T, User$secretCombinationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SecretCombinationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
    readonly nickname: FieldRef<"User", 'String'>
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
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
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
    skipDuplicates?: boolean
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
    skipDuplicates?: boolean
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
   * User.combinations
   */
  export type User$combinationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Combination
     */
    select?: CombinationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Combination
     */
    omit?: CombinationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CombinationInclude<ExtArgs> | null
    where?: CombinationWhereInput
    orderBy?: CombinationOrderByWithRelationInput | CombinationOrderByWithRelationInput[]
    cursor?: CombinationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CombinationScalarFieldEnum | CombinationScalarFieldEnum[]
  }

  /**
   * User.secretCombinations
   */
  export type User$secretCombinationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecretCombination
     */
    select?: SecretCombinationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SecretCombination
     */
    omit?: SecretCombinationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SecretCombinationInclude<ExtArgs> | null
    where?: SecretCombinationWhereInput
    orderBy?: SecretCombinationOrderByWithRelationInput | SecretCombinationOrderByWithRelationInput[]
    cursor?: SecretCombinationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SecretCombinationScalarFieldEnum | SecretCombinationScalarFieldEnum[]
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
   * Model Asset
   */

  export type AggregateAsset = {
    _count: AssetCountAggregateOutputType | null
    _avg: AssetAvgAggregateOutputType | null
    _sum: AssetSumAggregateOutputType | null
    _min: AssetMinAggregateOutputType | null
    _max: AssetMaxAggregateOutputType | null
  }

  export type AssetAvgAggregateOutputType = {
    durationSec: number | null
    nbUav: number | null
  }

  export type AssetSumAggregateOutputType = {
    durationSec: number | null
    nbUav: number | null
  }

  export type AssetMinAggregateOutputType = {
    id: string | null
    name: $Enums.AssetName | null
    thumbnail: string | null
    video: string | null
    description: string | null
    type: $Enums.AssetType | null
    durationSec: number | null
    nbUav: number | null
    createdAt: Date | null
  }

  export type AssetMaxAggregateOutputType = {
    id: string | null
    name: $Enums.AssetName | null
    thumbnail: string | null
    video: string | null
    description: string | null
    type: $Enums.AssetType | null
    durationSec: number | null
    nbUav: number | null
    createdAt: Date | null
  }

  export type AssetCountAggregateOutputType = {
    id: number
    name: number
    thumbnail: number
    video: number
    description: number
    type: number
    durationSec: number
    nbUav: number
    createdAt: number
    tags: number
    _all: number
  }


  export type AssetAvgAggregateInputType = {
    durationSec?: true
    nbUav?: true
  }

  export type AssetSumAggregateInputType = {
    durationSec?: true
    nbUav?: true
  }

  export type AssetMinAggregateInputType = {
    id?: true
    name?: true
    thumbnail?: true
    video?: true
    description?: true
    type?: true
    durationSec?: true
    nbUav?: true
    createdAt?: true
  }

  export type AssetMaxAggregateInputType = {
    id?: true
    name?: true
    thumbnail?: true
    video?: true
    description?: true
    type?: true
    durationSec?: true
    nbUav?: true
    createdAt?: true
  }

  export type AssetCountAggregateInputType = {
    id?: true
    name?: true
    thumbnail?: true
    video?: true
    description?: true
    type?: true
    durationSec?: true
    nbUav?: true
    createdAt?: true
    tags?: true
    _all?: true
  }

  export type AssetAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Asset to aggregate.
     */
    where?: AssetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assets to fetch.
     */
    orderBy?: AssetOrderByWithRelationInput | AssetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AssetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Assets
    **/
    _count?: true | AssetCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AssetAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AssetSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AssetMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AssetMaxAggregateInputType
  }

  export type GetAssetAggregateType<T extends AssetAggregateArgs> = {
        [P in keyof T & keyof AggregateAsset]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAsset[P]>
      : GetScalarType<T[P], AggregateAsset[P]>
  }




  export type AssetGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AssetWhereInput
    orderBy?: AssetOrderByWithAggregationInput | AssetOrderByWithAggregationInput[]
    by: AssetScalarFieldEnum[] | AssetScalarFieldEnum
    having?: AssetScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AssetCountAggregateInputType | true
    _avg?: AssetAvgAggregateInputType
    _sum?: AssetSumAggregateInputType
    _min?: AssetMinAggregateInputType
    _max?: AssetMaxAggregateInputType
  }

  export type AssetGroupByOutputType = {
    id: string
    name: $Enums.AssetName
    thumbnail: string
    video: string | null
    description: string
    type: $Enums.AssetType
    durationSec: number | null
    nbUav: number | null
    createdAt: Date
    tags: string[]
    _count: AssetCountAggregateOutputType | null
    _avg: AssetAvgAggregateOutputType | null
    _sum: AssetSumAggregateOutputType | null
    _min: AssetMinAggregateOutputType | null
    _max: AssetMaxAggregateOutputType | null
  }

  type GetAssetGroupByPayload<T extends AssetGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AssetGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AssetGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AssetGroupByOutputType[P]>
            : GetScalarType<T[P], AssetGroupByOutputType[P]>
        }
      >
    >


  export type AssetSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    thumbnail?: boolean
    video?: boolean
    description?: boolean
    type?: boolean
    durationSec?: boolean
    nbUav?: boolean
    createdAt?: boolean
    tags?: boolean
  }, ExtArgs["result"]["asset"]>

  export type AssetSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    thumbnail?: boolean
    video?: boolean
    description?: boolean
    type?: boolean
    durationSec?: boolean
    nbUav?: boolean
    createdAt?: boolean
    tags?: boolean
  }, ExtArgs["result"]["asset"]>

  export type AssetSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    thumbnail?: boolean
    video?: boolean
    description?: boolean
    type?: boolean
    durationSec?: boolean
    nbUav?: boolean
    createdAt?: boolean
    tags?: boolean
  }, ExtArgs["result"]["asset"]>

  export type AssetSelectScalar = {
    id?: boolean
    name?: boolean
    thumbnail?: boolean
    video?: boolean
    description?: boolean
    type?: boolean
    durationSec?: boolean
    nbUav?: boolean
    createdAt?: boolean
    tags?: boolean
  }

  export type AssetOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "thumbnail" | "video" | "description" | "type" | "durationSec" | "nbUav" | "createdAt" | "tags", ExtArgs["result"]["asset"]>

  export type $AssetPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Asset"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: $Enums.AssetName
      thumbnail: string
      video: string | null
      description: string
      type: $Enums.AssetType
      durationSec: number | null
      nbUav: number | null
      createdAt: Date
      tags: string[]
    }, ExtArgs["result"]["asset"]>
    composites: {}
  }

  type AssetGetPayload<S extends boolean | null | undefined | AssetDefaultArgs> = $Result.GetResult<Prisma.$AssetPayload, S>

  type AssetCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AssetFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AssetCountAggregateInputType | true
    }

  export interface AssetDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Asset'], meta: { name: 'Asset' } }
    /**
     * Find zero or one Asset that matches the filter.
     * @param {AssetFindUniqueArgs} args - Arguments to find a Asset
     * @example
     * // Get one Asset
     * const asset = await prisma.asset.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AssetFindUniqueArgs>(args: SelectSubset<T, AssetFindUniqueArgs<ExtArgs>>): Prisma__AssetClient<$Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Asset that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AssetFindUniqueOrThrowArgs} args - Arguments to find a Asset
     * @example
     * // Get one Asset
     * const asset = await prisma.asset.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AssetFindUniqueOrThrowArgs>(args: SelectSubset<T, AssetFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AssetClient<$Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Asset that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssetFindFirstArgs} args - Arguments to find a Asset
     * @example
     * // Get one Asset
     * const asset = await prisma.asset.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AssetFindFirstArgs>(args?: SelectSubset<T, AssetFindFirstArgs<ExtArgs>>): Prisma__AssetClient<$Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Asset that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssetFindFirstOrThrowArgs} args - Arguments to find a Asset
     * @example
     * // Get one Asset
     * const asset = await prisma.asset.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AssetFindFirstOrThrowArgs>(args?: SelectSubset<T, AssetFindFirstOrThrowArgs<ExtArgs>>): Prisma__AssetClient<$Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Assets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssetFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Assets
     * const assets = await prisma.asset.findMany()
     * 
     * // Get first 10 Assets
     * const assets = await prisma.asset.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const assetWithIdOnly = await prisma.asset.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AssetFindManyArgs>(args?: SelectSubset<T, AssetFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Asset.
     * @param {AssetCreateArgs} args - Arguments to create a Asset.
     * @example
     * // Create one Asset
     * const Asset = await prisma.asset.create({
     *   data: {
     *     // ... data to create a Asset
     *   }
     * })
     * 
     */
    create<T extends AssetCreateArgs>(args: SelectSubset<T, AssetCreateArgs<ExtArgs>>): Prisma__AssetClient<$Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Assets.
     * @param {AssetCreateManyArgs} args - Arguments to create many Assets.
     * @example
     * // Create many Assets
     * const asset = await prisma.asset.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AssetCreateManyArgs>(args?: SelectSubset<T, AssetCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Assets and returns the data saved in the database.
     * @param {AssetCreateManyAndReturnArgs} args - Arguments to create many Assets.
     * @example
     * // Create many Assets
     * const asset = await prisma.asset.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Assets and only return the `id`
     * const assetWithIdOnly = await prisma.asset.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AssetCreateManyAndReturnArgs>(args?: SelectSubset<T, AssetCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Asset.
     * @param {AssetDeleteArgs} args - Arguments to delete one Asset.
     * @example
     * // Delete one Asset
     * const Asset = await prisma.asset.delete({
     *   where: {
     *     // ... filter to delete one Asset
     *   }
     * })
     * 
     */
    delete<T extends AssetDeleteArgs>(args: SelectSubset<T, AssetDeleteArgs<ExtArgs>>): Prisma__AssetClient<$Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Asset.
     * @param {AssetUpdateArgs} args - Arguments to update one Asset.
     * @example
     * // Update one Asset
     * const asset = await prisma.asset.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AssetUpdateArgs>(args: SelectSubset<T, AssetUpdateArgs<ExtArgs>>): Prisma__AssetClient<$Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Assets.
     * @param {AssetDeleteManyArgs} args - Arguments to filter Assets to delete.
     * @example
     * // Delete a few Assets
     * const { count } = await prisma.asset.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AssetDeleteManyArgs>(args?: SelectSubset<T, AssetDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Assets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssetUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Assets
     * const asset = await prisma.asset.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AssetUpdateManyArgs>(args: SelectSubset<T, AssetUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Assets and returns the data updated in the database.
     * @param {AssetUpdateManyAndReturnArgs} args - Arguments to update many Assets.
     * @example
     * // Update many Assets
     * const asset = await prisma.asset.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Assets and only return the `id`
     * const assetWithIdOnly = await prisma.asset.updateManyAndReturn({
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
    updateManyAndReturn<T extends AssetUpdateManyAndReturnArgs>(args: SelectSubset<T, AssetUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Asset.
     * @param {AssetUpsertArgs} args - Arguments to update or create a Asset.
     * @example
     * // Update or create a Asset
     * const asset = await prisma.asset.upsert({
     *   create: {
     *     // ... data to create a Asset
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Asset we want to update
     *   }
     * })
     */
    upsert<T extends AssetUpsertArgs>(args: SelectSubset<T, AssetUpsertArgs<ExtArgs>>): Prisma__AssetClient<$Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Assets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssetCountArgs} args - Arguments to filter Assets to count.
     * @example
     * // Count the number of Assets
     * const count = await prisma.asset.count({
     *   where: {
     *     // ... the filter for the Assets we want to count
     *   }
     * })
    **/
    count<T extends AssetCountArgs>(
      args?: Subset<T, AssetCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AssetCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Asset.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssetAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AssetAggregateArgs>(args: Subset<T, AssetAggregateArgs>): Prisma.PrismaPromise<GetAssetAggregateType<T>>

    /**
     * Group by Asset.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssetGroupByArgs} args - Group by arguments.
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
      T extends AssetGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AssetGroupByArgs['orderBy'] }
        : { orderBy?: AssetGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AssetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAssetGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Asset model
   */
  readonly fields: AssetFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Asset.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AssetClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Asset model
   */
  interface AssetFieldRefs {
    readonly id: FieldRef<"Asset", 'String'>
    readonly name: FieldRef<"Asset", 'AssetName'>
    readonly thumbnail: FieldRef<"Asset", 'String'>
    readonly video: FieldRef<"Asset", 'String'>
    readonly description: FieldRef<"Asset", 'String'>
    readonly type: FieldRef<"Asset", 'AssetType'>
    readonly durationSec: FieldRef<"Asset", 'Int'>
    readonly nbUav: FieldRef<"Asset", 'Int'>
    readonly createdAt: FieldRef<"Asset", 'DateTime'>
    readonly tags: FieldRef<"Asset", 'String[]'>
  }
    

  // Custom InputTypes
  /**
   * Asset findUnique
   */
  export type AssetFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asset
     */
    select?: AssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Asset
     */
    omit?: AssetOmit<ExtArgs> | null
    /**
     * Filter, which Asset to fetch.
     */
    where: AssetWhereUniqueInput
  }

  /**
   * Asset findUniqueOrThrow
   */
  export type AssetFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asset
     */
    select?: AssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Asset
     */
    omit?: AssetOmit<ExtArgs> | null
    /**
     * Filter, which Asset to fetch.
     */
    where: AssetWhereUniqueInput
  }

  /**
   * Asset findFirst
   */
  export type AssetFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asset
     */
    select?: AssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Asset
     */
    omit?: AssetOmit<ExtArgs> | null
    /**
     * Filter, which Asset to fetch.
     */
    where?: AssetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assets to fetch.
     */
    orderBy?: AssetOrderByWithRelationInput | AssetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Assets.
     */
    cursor?: AssetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Assets.
     */
    distinct?: AssetScalarFieldEnum | AssetScalarFieldEnum[]
  }

  /**
   * Asset findFirstOrThrow
   */
  export type AssetFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asset
     */
    select?: AssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Asset
     */
    omit?: AssetOmit<ExtArgs> | null
    /**
     * Filter, which Asset to fetch.
     */
    where?: AssetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assets to fetch.
     */
    orderBy?: AssetOrderByWithRelationInput | AssetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Assets.
     */
    cursor?: AssetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Assets.
     */
    distinct?: AssetScalarFieldEnum | AssetScalarFieldEnum[]
  }

  /**
   * Asset findMany
   */
  export type AssetFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asset
     */
    select?: AssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Asset
     */
    omit?: AssetOmit<ExtArgs> | null
    /**
     * Filter, which Assets to fetch.
     */
    where?: AssetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assets to fetch.
     */
    orderBy?: AssetOrderByWithRelationInput | AssetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Assets.
     */
    cursor?: AssetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Assets.
     */
    distinct?: AssetScalarFieldEnum | AssetScalarFieldEnum[]
  }

  /**
   * Asset create
   */
  export type AssetCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asset
     */
    select?: AssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Asset
     */
    omit?: AssetOmit<ExtArgs> | null
    /**
     * The data needed to create a Asset.
     */
    data: XOR<AssetCreateInput, AssetUncheckedCreateInput>
  }

  /**
   * Asset createMany
   */
  export type AssetCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Assets.
     */
    data: AssetCreateManyInput | AssetCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Asset createManyAndReturn
   */
  export type AssetCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asset
     */
    select?: AssetSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Asset
     */
    omit?: AssetOmit<ExtArgs> | null
    /**
     * The data used to create many Assets.
     */
    data: AssetCreateManyInput | AssetCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Asset update
   */
  export type AssetUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asset
     */
    select?: AssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Asset
     */
    omit?: AssetOmit<ExtArgs> | null
    /**
     * The data needed to update a Asset.
     */
    data: XOR<AssetUpdateInput, AssetUncheckedUpdateInput>
    /**
     * Choose, which Asset to update.
     */
    where: AssetWhereUniqueInput
  }

  /**
   * Asset updateMany
   */
  export type AssetUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Assets.
     */
    data: XOR<AssetUpdateManyMutationInput, AssetUncheckedUpdateManyInput>
    /**
     * Filter which Assets to update
     */
    where?: AssetWhereInput
    /**
     * Limit how many Assets to update.
     */
    limit?: number
  }

  /**
   * Asset updateManyAndReturn
   */
  export type AssetUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asset
     */
    select?: AssetSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Asset
     */
    omit?: AssetOmit<ExtArgs> | null
    /**
     * The data used to update Assets.
     */
    data: XOR<AssetUpdateManyMutationInput, AssetUncheckedUpdateManyInput>
    /**
     * Filter which Assets to update
     */
    where?: AssetWhereInput
    /**
     * Limit how many Assets to update.
     */
    limit?: number
  }

  /**
   * Asset upsert
   */
  export type AssetUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asset
     */
    select?: AssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Asset
     */
    omit?: AssetOmit<ExtArgs> | null
    /**
     * The filter to search for the Asset to update in case it exists.
     */
    where: AssetWhereUniqueInput
    /**
     * In case the Asset found by the `where` argument doesn't exist, create a new Asset with this data.
     */
    create: XOR<AssetCreateInput, AssetUncheckedCreateInput>
    /**
     * In case the Asset was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AssetUpdateInput, AssetUncheckedUpdateInput>
  }

  /**
   * Asset delete
   */
  export type AssetDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asset
     */
    select?: AssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Asset
     */
    omit?: AssetOmit<ExtArgs> | null
    /**
     * Filter which Asset to delete.
     */
    where: AssetWhereUniqueInput
  }

  /**
   * Asset deleteMany
   */
  export type AssetDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Assets to delete
     */
    where?: AssetWhereInput
    /**
     * Limit how many Assets to delete.
     */
    limit?: number
  }

  /**
   * Asset without action
   */
  export type AssetDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asset
     */
    select?: AssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Asset
     */
    omit?: AssetOmit<ExtArgs> | null
  }


  /**
   * Model Combination
   */

  export type AggregateCombination = {
    _count: CombinationCountAggregateOutputType | null
    _min: CombinationMinAggregateOutputType | null
    _max: CombinationMaxAggregateOutputType | null
  }

  export type CombinationMinAggregateOutputType = {
    id: string | null
    assetOne: $Enums.AssetName | null
    assetTwo: $Enums.AssetName | null
    assetThree: $Enums.AssetName | null
    assetFour: $Enums.AssetName | null
    foundAt: Date | null
    foundById: string | null
    sound: $Enums.Sound | null
  }

  export type CombinationMaxAggregateOutputType = {
    id: string | null
    assetOne: $Enums.AssetName | null
    assetTwo: $Enums.AssetName | null
    assetThree: $Enums.AssetName | null
    assetFour: $Enums.AssetName | null
    foundAt: Date | null
    foundById: string | null
    sound: $Enums.Sound | null
  }

  export type CombinationCountAggregateOutputType = {
    id: number
    assetOne: number
    assetTwo: number
    assetThree: number
    assetFour: number
    foundAt: number
    foundById: number
    sound: number
    _all: number
  }


  export type CombinationMinAggregateInputType = {
    id?: true
    assetOne?: true
    assetTwo?: true
    assetThree?: true
    assetFour?: true
    foundAt?: true
    foundById?: true
    sound?: true
  }

  export type CombinationMaxAggregateInputType = {
    id?: true
    assetOne?: true
    assetTwo?: true
    assetThree?: true
    assetFour?: true
    foundAt?: true
    foundById?: true
    sound?: true
  }

  export type CombinationCountAggregateInputType = {
    id?: true
    assetOne?: true
    assetTwo?: true
    assetThree?: true
    assetFour?: true
    foundAt?: true
    foundById?: true
    sound?: true
    _all?: true
  }

  export type CombinationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Combination to aggregate.
     */
    where?: CombinationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Combinations to fetch.
     */
    orderBy?: CombinationOrderByWithRelationInput | CombinationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CombinationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Combinations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Combinations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Combinations
    **/
    _count?: true | CombinationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CombinationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CombinationMaxAggregateInputType
  }

  export type GetCombinationAggregateType<T extends CombinationAggregateArgs> = {
        [P in keyof T & keyof AggregateCombination]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCombination[P]>
      : GetScalarType<T[P], AggregateCombination[P]>
  }




  export type CombinationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CombinationWhereInput
    orderBy?: CombinationOrderByWithAggregationInput | CombinationOrderByWithAggregationInput[]
    by: CombinationScalarFieldEnum[] | CombinationScalarFieldEnum
    having?: CombinationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CombinationCountAggregateInputType | true
    _min?: CombinationMinAggregateInputType
    _max?: CombinationMaxAggregateInputType
  }

  export type CombinationGroupByOutputType = {
    id: string
    assetOne: $Enums.AssetName
    assetTwo: $Enums.AssetName | null
    assetThree: $Enums.AssetName | null
    assetFour: $Enums.AssetName | null
    foundAt: Date
    foundById: string
    sound: $Enums.Sound
    _count: CombinationCountAggregateOutputType | null
    _min: CombinationMinAggregateOutputType | null
    _max: CombinationMaxAggregateOutputType | null
  }

  type GetCombinationGroupByPayload<T extends CombinationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CombinationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CombinationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CombinationGroupByOutputType[P]>
            : GetScalarType<T[P], CombinationGroupByOutputType[P]>
        }
      >
    >


  export type CombinationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    assetOne?: boolean
    assetTwo?: boolean
    assetThree?: boolean
    assetFour?: boolean
    foundAt?: boolean
    foundById?: boolean
    sound?: boolean
    foundBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["combination"]>

  export type CombinationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    assetOne?: boolean
    assetTwo?: boolean
    assetThree?: boolean
    assetFour?: boolean
    foundAt?: boolean
    foundById?: boolean
    sound?: boolean
    foundBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["combination"]>

  export type CombinationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    assetOne?: boolean
    assetTwo?: boolean
    assetThree?: boolean
    assetFour?: boolean
    foundAt?: boolean
    foundById?: boolean
    sound?: boolean
    foundBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["combination"]>

  export type CombinationSelectScalar = {
    id?: boolean
    assetOne?: boolean
    assetTwo?: boolean
    assetThree?: boolean
    assetFour?: boolean
    foundAt?: boolean
    foundById?: boolean
    sound?: boolean
  }

  export type CombinationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "assetOne" | "assetTwo" | "assetThree" | "assetFour" | "foundAt" | "foundById" | "sound", ExtArgs["result"]["combination"]>
  export type CombinationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    foundBy?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CombinationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    foundBy?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CombinationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    foundBy?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CombinationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Combination"
    objects: {
      foundBy: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      assetOne: $Enums.AssetName
      assetTwo: $Enums.AssetName | null
      assetThree: $Enums.AssetName | null
      assetFour: $Enums.AssetName | null
      foundAt: Date
      foundById: string
      sound: $Enums.Sound
    }, ExtArgs["result"]["combination"]>
    composites: {}
  }

  type CombinationGetPayload<S extends boolean | null | undefined | CombinationDefaultArgs> = $Result.GetResult<Prisma.$CombinationPayload, S>

  type CombinationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CombinationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CombinationCountAggregateInputType | true
    }

  export interface CombinationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Combination'], meta: { name: 'Combination' } }
    /**
     * Find zero or one Combination that matches the filter.
     * @param {CombinationFindUniqueArgs} args - Arguments to find a Combination
     * @example
     * // Get one Combination
     * const combination = await prisma.combination.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CombinationFindUniqueArgs>(args: SelectSubset<T, CombinationFindUniqueArgs<ExtArgs>>): Prisma__CombinationClient<$Result.GetResult<Prisma.$CombinationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Combination that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CombinationFindUniqueOrThrowArgs} args - Arguments to find a Combination
     * @example
     * // Get one Combination
     * const combination = await prisma.combination.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CombinationFindUniqueOrThrowArgs>(args: SelectSubset<T, CombinationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CombinationClient<$Result.GetResult<Prisma.$CombinationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Combination that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CombinationFindFirstArgs} args - Arguments to find a Combination
     * @example
     * // Get one Combination
     * const combination = await prisma.combination.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CombinationFindFirstArgs>(args?: SelectSubset<T, CombinationFindFirstArgs<ExtArgs>>): Prisma__CombinationClient<$Result.GetResult<Prisma.$CombinationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Combination that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CombinationFindFirstOrThrowArgs} args - Arguments to find a Combination
     * @example
     * // Get one Combination
     * const combination = await prisma.combination.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CombinationFindFirstOrThrowArgs>(args?: SelectSubset<T, CombinationFindFirstOrThrowArgs<ExtArgs>>): Prisma__CombinationClient<$Result.GetResult<Prisma.$CombinationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Combinations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CombinationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Combinations
     * const combinations = await prisma.combination.findMany()
     * 
     * // Get first 10 Combinations
     * const combinations = await prisma.combination.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const combinationWithIdOnly = await prisma.combination.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CombinationFindManyArgs>(args?: SelectSubset<T, CombinationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CombinationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Combination.
     * @param {CombinationCreateArgs} args - Arguments to create a Combination.
     * @example
     * // Create one Combination
     * const Combination = await prisma.combination.create({
     *   data: {
     *     // ... data to create a Combination
     *   }
     * })
     * 
     */
    create<T extends CombinationCreateArgs>(args: SelectSubset<T, CombinationCreateArgs<ExtArgs>>): Prisma__CombinationClient<$Result.GetResult<Prisma.$CombinationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Combinations.
     * @param {CombinationCreateManyArgs} args - Arguments to create many Combinations.
     * @example
     * // Create many Combinations
     * const combination = await prisma.combination.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CombinationCreateManyArgs>(args?: SelectSubset<T, CombinationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Combinations and returns the data saved in the database.
     * @param {CombinationCreateManyAndReturnArgs} args - Arguments to create many Combinations.
     * @example
     * // Create many Combinations
     * const combination = await prisma.combination.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Combinations and only return the `id`
     * const combinationWithIdOnly = await prisma.combination.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CombinationCreateManyAndReturnArgs>(args?: SelectSubset<T, CombinationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CombinationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Combination.
     * @param {CombinationDeleteArgs} args - Arguments to delete one Combination.
     * @example
     * // Delete one Combination
     * const Combination = await prisma.combination.delete({
     *   where: {
     *     // ... filter to delete one Combination
     *   }
     * })
     * 
     */
    delete<T extends CombinationDeleteArgs>(args: SelectSubset<T, CombinationDeleteArgs<ExtArgs>>): Prisma__CombinationClient<$Result.GetResult<Prisma.$CombinationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Combination.
     * @param {CombinationUpdateArgs} args - Arguments to update one Combination.
     * @example
     * // Update one Combination
     * const combination = await prisma.combination.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CombinationUpdateArgs>(args: SelectSubset<T, CombinationUpdateArgs<ExtArgs>>): Prisma__CombinationClient<$Result.GetResult<Prisma.$CombinationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Combinations.
     * @param {CombinationDeleteManyArgs} args - Arguments to filter Combinations to delete.
     * @example
     * // Delete a few Combinations
     * const { count } = await prisma.combination.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CombinationDeleteManyArgs>(args?: SelectSubset<T, CombinationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Combinations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CombinationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Combinations
     * const combination = await prisma.combination.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CombinationUpdateManyArgs>(args: SelectSubset<T, CombinationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Combinations and returns the data updated in the database.
     * @param {CombinationUpdateManyAndReturnArgs} args - Arguments to update many Combinations.
     * @example
     * // Update many Combinations
     * const combination = await prisma.combination.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Combinations and only return the `id`
     * const combinationWithIdOnly = await prisma.combination.updateManyAndReturn({
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
    updateManyAndReturn<T extends CombinationUpdateManyAndReturnArgs>(args: SelectSubset<T, CombinationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CombinationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Combination.
     * @param {CombinationUpsertArgs} args - Arguments to update or create a Combination.
     * @example
     * // Update or create a Combination
     * const combination = await prisma.combination.upsert({
     *   create: {
     *     // ... data to create a Combination
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Combination we want to update
     *   }
     * })
     */
    upsert<T extends CombinationUpsertArgs>(args: SelectSubset<T, CombinationUpsertArgs<ExtArgs>>): Prisma__CombinationClient<$Result.GetResult<Prisma.$CombinationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Combinations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CombinationCountArgs} args - Arguments to filter Combinations to count.
     * @example
     * // Count the number of Combinations
     * const count = await prisma.combination.count({
     *   where: {
     *     // ... the filter for the Combinations we want to count
     *   }
     * })
    **/
    count<T extends CombinationCountArgs>(
      args?: Subset<T, CombinationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CombinationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Combination.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CombinationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CombinationAggregateArgs>(args: Subset<T, CombinationAggregateArgs>): Prisma.PrismaPromise<GetCombinationAggregateType<T>>

    /**
     * Group by Combination.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CombinationGroupByArgs} args - Group by arguments.
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
      T extends CombinationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CombinationGroupByArgs['orderBy'] }
        : { orderBy?: CombinationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CombinationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCombinationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Combination model
   */
  readonly fields: CombinationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Combination.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CombinationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    foundBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Combination model
   */
  interface CombinationFieldRefs {
    readonly id: FieldRef<"Combination", 'String'>
    readonly assetOne: FieldRef<"Combination", 'AssetName'>
    readonly assetTwo: FieldRef<"Combination", 'AssetName'>
    readonly assetThree: FieldRef<"Combination", 'AssetName'>
    readonly assetFour: FieldRef<"Combination", 'AssetName'>
    readonly foundAt: FieldRef<"Combination", 'DateTime'>
    readonly foundById: FieldRef<"Combination", 'String'>
    readonly sound: FieldRef<"Combination", 'Sound'>
  }
    

  // Custom InputTypes
  /**
   * Combination findUnique
   */
  export type CombinationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Combination
     */
    select?: CombinationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Combination
     */
    omit?: CombinationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CombinationInclude<ExtArgs> | null
    /**
     * Filter, which Combination to fetch.
     */
    where: CombinationWhereUniqueInput
  }

  /**
   * Combination findUniqueOrThrow
   */
  export type CombinationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Combination
     */
    select?: CombinationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Combination
     */
    omit?: CombinationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CombinationInclude<ExtArgs> | null
    /**
     * Filter, which Combination to fetch.
     */
    where: CombinationWhereUniqueInput
  }

  /**
   * Combination findFirst
   */
  export type CombinationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Combination
     */
    select?: CombinationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Combination
     */
    omit?: CombinationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CombinationInclude<ExtArgs> | null
    /**
     * Filter, which Combination to fetch.
     */
    where?: CombinationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Combinations to fetch.
     */
    orderBy?: CombinationOrderByWithRelationInput | CombinationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Combinations.
     */
    cursor?: CombinationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Combinations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Combinations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Combinations.
     */
    distinct?: CombinationScalarFieldEnum | CombinationScalarFieldEnum[]
  }

  /**
   * Combination findFirstOrThrow
   */
  export type CombinationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Combination
     */
    select?: CombinationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Combination
     */
    omit?: CombinationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CombinationInclude<ExtArgs> | null
    /**
     * Filter, which Combination to fetch.
     */
    where?: CombinationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Combinations to fetch.
     */
    orderBy?: CombinationOrderByWithRelationInput | CombinationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Combinations.
     */
    cursor?: CombinationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Combinations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Combinations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Combinations.
     */
    distinct?: CombinationScalarFieldEnum | CombinationScalarFieldEnum[]
  }

  /**
   * Combination findMany
   */
  export type CombinationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Combination
     */
    select?: CombinationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Combination
     */
    omit?: CombinationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CombinationInclude<ExtArgs> | null
    /**
     * Filter, which Combinations to fetch.
     */
    where?: CombinationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Combinations to fetch.
     */
    orderBy?: CombinationOrderByWithRelationInput | CombinationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Combinations.
     */
    cursor?: CombinationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Combinations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Combinations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Combinations.
     */
    distinct?: CombinationScalarFieldEnum | CombinationScalarFieldEnum[]
  }

  /**
   * Combination create
   */
  export type CombinationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Combination
     */
    select?: CombinationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Combination
     */
    omit?: CombinationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CombinationInclude<ExtArgs> | null
    /**
     * The data needed to create a Combination.
     */
    data: XOR<CombinationCreateInput, CombinationUncheckedCreateInput>
  }

  /**
   * Combination createMany
   */
  export type CombinationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Combinations.
     */
    data: CombinationCreateManyInput | CombinationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Combination createManyAndReturn
   */
  export type CombinationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Combination
     */
    select?: CombinationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Combination
     */
    omit?: CombinationOmit<ExtArgs> | null
    /**
     * The data used to create many Combinations.
     */
    data: CombinationCreateManyInput | CombinationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CombinationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Combination update
   */
  export type CombinationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Combination
     */
    select?: CombinationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Combination
     */
    omit?: CombinationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CombinationInclude<ExtArgs> | null
    /**
     * The data needed to update a Combination.
     */
    data: XOR<CombinationUpdateInput, CombinationUncheckedUpdateInput>
    /**
     * Choose, which Combination to update.
     */
    where: CombinationWhereUniqueInput
  }

  /**
   * Combination updateMany
   */
  export type CombinationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Combinations.
     */
    data: XOR<CombinationUpdateManyMutationInput, CombinationUncheckedUpdateManyInput>
    /**
     * Filter which Combinations to update
     */
    where?: CombinationWhereInput
    /**
     * Limit how many Combinations to update.
     */
    limit?: number
  }

  /**
   * Combination updateManyAndReturn
   */
  export type CombinationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Combination
     */
    select?: CombinationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Combination
     */
    omit?: CombinationOmit<ExtArgs> | null
    /**
     * The data used to update Combinations.
     */
    data: XOR<CombinationUpdateManyMutationInput, CombinationUncheckedUpdateManyInput>
    /**
     * Filter which Combinations to update
     */
    where?: CombinationWhereInput
    /**
     * Limit how many Combinations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CombinationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Combination upsert
   */
  export type CombinationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Combination
     */
    select?: CombinationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Combination
     */
    omit?: CombinationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CombinationInclude<ExtArgs> | null
    /**
     * The filter to search for the Combination to update in case it exists.
     */
    where: CombinationWhereUniqueInput
    /**
     * In case the Combination found by the `where` argument doesn't exist, create a new Combination with this data.
     */
    create: XOR<CombinationCreateInput, CombinationUncheckedCreateInput>
    /**
     * In case the Combination was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CombinationUpdateInput, CombinationUncheckedUpdateInput>
  }

  /**
   * Combination delete
   */
  export type CombinationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Combination
     */
    select?: CombinationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Combination
     */
    omit?: CombinationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CombinationInclude<ExtArgs> | null
    /**
     * Filter which Combination to delete.
     */
    where: CombinationWhereUniqueInput
  }

  /**
   * Combination deleteMany
   */
  export type CombinationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Combinations to delete
     */
    where?: CombinationWhereInput
    /**
     * Limit how many Combinations to delete.
     */
    limit?: number
  }

  /**
   * Combination without action
   */
  export type CombinationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Combination
     */
    select?: CombinationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Combination
     */
    omit?: CombinationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CombinationInclude<ExtArgs> | null
  }


  /**
   * Model SecretCombination
   */

  export type AggregateSecretCombination = {
    _count: SecretCombinationCountAggregateOutputType | null
    _min: SecretCombinationMinAggregateOutputType | null
    _max: SecretCombinationMaxAggregateOutputType | null
  }

  export type SecretCombinationMinAggregateOutputType = {
    id: string | null
    assetOne: $Enums.AssetName | null
    assetTwo: $Enums.AssetName | null
    assetThree: $Enums.AssetName | null
    assetFour: $Enums.AssetName | null
    sound: $Enums.Sound | null
    foundById: string | null
    foundByEmail: string | null
    foundAt: Date | null
  }

  export type SecretCombinationMaxAggregateOutputType = {
    id: string | null
    assetOne: $Enums.AssetName | null
    assetTwo: $Enums.AssetName | null
    assetThree: $Enums.AssetName | null
    assetFour: $Enums.AssetName | null
    sound: $Enums.Sound | null
    foundById: string | null
    foundByEmail: string | null
    foundAt: Date | null
  }

  export type SecretCombinationCountAggregateOutputType = {
    id: number
    assetOne: number
    assetTwo: number
    assetThree: number
    assetFour: number
    sound: number
    foundById: number
    foundByEmail: number
    foundAt: number
    _all: number
  }


  export type SecretCombinationMinAggregateInputType = {
    id?: true
    assetOne?: true
    assetTwo?: true
    assetThree?: true
    assetFour?: true
    sound?: true
    foundById?: true
    foundByEmail?: true
    foundAt?: true
  }

  export type SecretCombinationMaxAggregateInputType = {
    id?: true
    assetOne?: true
    assetTwo?: true
    assetThree?: true
    assetFour?: true
    sound?: true
    foundById?: true
    foundByEmail?: true
    foundAt?: true
  }

  export type SecretCombinationCountAggregateInputType = {
    id?: true
    assetOne?: true
    assetTwo?: true
    assetThree?: true
    assetFour?: true
    sound?: true
    foundById?: true
    foundByEmail?: true
    foundAt?: true
    _all?: true
  }

  export type SecretCombinationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SecretCombination to aggregate.
     */
    where?: SecretCombinationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SecretCombinations to fetch.
     */
    orderBy?: SecretCombinationOrderByWithRelationInput | SecretCombinationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SecretCombinationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SecretCombinations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SecretCombinations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SecretCombinations
    **/
    _count?: true | SecretCombinationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SecretCombinationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SecretCombinationMaxAggregateInputType
  }

  export type GetSecretCombinationAggregateType<T extends SecretCombinationAggregateArgs> = {
        [P in keyof T & keyof AggregateSecretCombination]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSecretCombination[P]>
      : GetScalarType<T[P], AggregateSecretCombination[P]>
  }




  export type SecretCombinationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SecretCombinationWhereInput
    orderBy?: SecretCombinationOrderByWithAggregationInput | SecretCombinationOrderByWithAggregationInput[]
    by: SecretCombinationScalarFieldEnum[] | SecretCombinationScalarFieldEnum
    having?: SecretCombinationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SecretCombinationCountAggregateInputType | true
    _min?: SecretCombinationMinAggregateInputType
    _max?: SecretCombinationMaxAggregateInputType
  }

  export type SecretCombinationGroupByOutputType = {
    id: string
    assetOne: $Enums.AssetName
    assetTwo: $Enums.AssetName | null
    assetThree: $Enums.AssetName | null
    assetFour: $Enums.AssetName | null
    sound: $Enums.Sound
    foundById: string | null
    foundByEmail: string | null
    foundAt: Date | null
    _count: SecretCombinationCountAggregateOutputType | null
    _min: SecretCombinationMinAggregateOutputType | null
    _max: SecretCombinationMaxAggregateOutputType | null
  }

  type GetSecretCombinationGroupByPayload<T extends SecretCombinationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SecretCombinationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SecretCombinationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SecretCombinationGroupByOutputType[P]>
            : GetScalarType<T[P], SecretCombinationGroupByOutputType[P]>
        }
      >
    >


  export type SecretCombinationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    assetOne?: boolean
    assetTwo?: boolean
    assetThree?: boolean
    assetFour?: boolean
    sound?: boolean
    foundById?: boolean
    foundByEmail?: boolean
    foundAt?: boolean
    foundBy?: boolean | SecretCombination$foundByArgs<ExtArgs>
  }, ExtArgs["result"]["secretCombination"]>

  export type SecretCombinationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    assetOne?: boolean
    assetTwo?: boolean
    assetThree?: boolean
    assetFour?: boolean
    sound?: boolean
    foundById?: boolean
    foundByEmail?: boolean
    foundAt?: boolean
    foundBy?: boolean | SecretCombination$foundByArgs<ExtArgs>
  }, ExtArgs["result"]["secretCombination"]>

  export type SecretCombinationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    assetOne?: boolean
    assetTwo?: boolean
    assetThree?: boolean
    assetFour?: boolean
    sound?: boolean
    foundById?: boolean
    foundByEmail?: boolean
    foundAt?: boolean
    foundBy?: boolean | SecretCombination$foundByArgs<ExtArgs>
  }, ExtArgs["result"]["secretCombination"]>

  export type SecretCombinationSelectScalar = {
    id?: boolean
    assetOne?: boolean
    assetTwo?: boolean
    assetThree?: boolean
    assetFour?: boolean
    sound?: boolean
    foundById?: boolean
    foundByEmail?: boolean
    foundAt?: boolean
  }

  export type SecretCombinationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "assetOne" | "assetTwo" | "assetThree" | "assetFour" | "sound" | "foundById" | "foundByEmail" | "foundAt", ExtArgs["result"]["secretCombination"]>
  export type SecretCombinationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    foundBy?: boolean | SecretCombination$foundByArgs<ExtArgs>
  }
  export type SecretCombinationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    foundBy?: boolean | SecretCombination$foundByArgs<ExtArgs>
  }
  export type SecretCombinationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    foundBy?: boolean | SecretCombination$foundByArgs<ExtArgs>
  }

  export type $SecretCombinationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SecretCombination"
    objects: {
      foundBy: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      assetOne: $Enums.AssetName
      assetTwo: $Enums.AssetName | null
      assetThree: $Enums.AssetName | null
      assetFour: $Enums.AssetName | null
      sound: $Enums.Sound
      foundById: string | null
      foundByEmail: string | null
      foundAt: Date | null
    }, ExtArgs["result"]["secretCombination"]>
    composites: {}
  }

  type SecretCombinationGetPayload<S extends boolean | null | undefined | SecretCombinationDefaultArgs> = $Result.GetResult<Prisma.$SecretCombinationPayload, S>

  type SecretCombinationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SecretCombinationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SecretCombinationCountAggregateInputType | true
    }

  export interface SecretCombinationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SecretCombination'], meta: { name: 'SecretCombination' } }
    /**
     * Find zero or one SecretCombination that matches the filter.
     * @param {SecretCombinationFindUniqueArgs} args - Arguments to find a SecretCombination
     * @example
     * // Get one SecretCombination
     * const secretCombination = await prisma.secretCombination.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SecretCombinationFindUniqueArgs>(args: SelectSubset<T, SecretCombinationFindUniqueArgs<ExtArgs>>): Prisma__SecretCombinationClient<$Result.GetResult<Prisma.$SecretCombinationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SecretCombination that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SecretCombinationFindUniqueOrThrowArgs} args - Arguments to find a SecretCombination
     * @example
     * // Get one SecretCombination
     * const secretCombination = await prisma.secretCombination.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SecretCombinationFindUniqueOrThrowArgs>(args: SelectSubset<T, SecretCombinationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SecretCombinationClient<$Result.GetResult<Prisma.$SecretCombinationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SecretCombination that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SecretCombinationFindFirstArgs} args - Arguments to find a SecretCombination
     * @example
     * // Get one SecretCombination
     * const secretCombination = await prisma.secretCombination.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SecretCombinationFindFirstArgs>(args?: SelectSubset<T, SecretCombinationFindFirstArgs<ExtArgs>>): Prisma__SecretCombinationClient<$Result.GetResult<Prisma.$SecretCombinationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SecretCombination that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SecretCombinationFindFirstOrThrowArgs} args - Arguments to find a SecretCombination
     * @example
     * // Get one SecretCombination
     * const secretCombination = await prisma.secretCombination.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SecretCombinationFindFirstOrThrowArgs>(args?: SelectSubset<T, SecretCombinationFindFirstOrThrowArgs<ExtArgs>>): Prisma__SecretCombinationClient<$Result.GetResult<Prisma.$SecretCombinationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SecretCombinations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SecretCombinationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SecretCombinations
     * const secretCombinations = await prisma.secretCombination.findMany()
     * 
     * // Get first 10 SecretCombinations
     * const secretCombinations = await prisma.secretCombination.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const secretCombinationWithIdOnly = await prisma.secretCombination.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SecretCombinationFindManyArgs>(args?: SelectSubset<T, SecretCombinationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SecretCombinationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SecretCombination.
     * @param {SecretCombinationCreateArgs} args - Arguments to create a SecretCombination.
     * @example
     * // Create one SecretCombination
     * const SecretCombination = await prisma.secretCombination.create({
     *   data: {
     *     // ... data to create a SecretCombination
     *   }
     * })
     * 
     */
    create<T extends SecretCombinationCreateArgs>(args: SelectSubset<T, SecretCombinationCreateArgs<ExtArgs>>): Prisma__SecretCombinationClient<$Result.GetResult<Prisma.$SecretCombinationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SecretCombinations.
     * @param {SecretCombinationCreateManyArgs} args - Arguments to create many SecretCombinations.
     * @example
     * // Create many SecretCombinations
     * const secretCombination = await prisma.secretCombination.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SecretCombinationCreateManyArgs>(args?: SelectSubset<T, SecretCombinationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SecretCombinations and returns the data saved in the database.
     * @param {SecretCombinationCreateManyAndReturnArgs} args - Arguments to create many SecretCombinations.
     * @example
     * // Create many SecretCombinations
     * const secretCombination = await prisma.secretCombination.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SecretCombinations and only return the `id`
     * const secretCombinationWithIdOnly = await prisma.secretCombination.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SecretCombinationCreateManyAndReturnArgs>(args?: SelectSubset<T, SecretCombinationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SecretCombinationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SecretCombination.
     * @param {SecretCombinationDeleteArgs} args - Arguments to delete one SecretCombination.
     * @example
     * // Delete one SecretCombination
     * const SecretCombination = await prisma.secretCombination.delete({
     *   where: {
     *     // ... filter to delete one SecretCombination
     *   }
     * })
     * 
     */
    delete<T extends SecretCombinationDeleteArgs>(args: SelectSubset<T, SecretCombinationDeleteArgs<ExtArgs>>): Prisma__SecretCombinationClient<$Result.GetResult<Prisma.$SecretCombinationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SecretCombination.
     * @param {SecretCombinationUpdateArgs} args - Arguments to update one SecretCombination.
     * @example
     * // Update one SecretCombination
     * const secretCombination = await prisma.secretCombination.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SecretCombinationUpdateArgs>(args: SelectSubset<T, SecretCombinationUpdateArgs<ExtArgs>>): Prisma__SecretCombinationClient<$Result.GetResult<Prisma.$SecretCombinationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SecretCombinations.
     * @param {SecretCombinationDeleteManyArgs} args - Arguments to filter SecretCombinations to delete.
     * @example
     * // Delete a few SecretCombinations
     * const { count } = await prisma.secretCombination.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SecretCombinationDeleteManyArgs>(args?: SelectSubset<T, SecretCombinationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SecretCombinations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SecretCombinationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SecretCombinations
     * const secretCombination = await prisma.secretCombination.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SecretCombinationUpdateManyArgs>(args: SelectSubset<T, SecretCombinationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SecretCombinations and returns the data updated in the database.
     * @param {SecretCombinationUpdateManyAndReturnArgs} args - Arguments to update many SecretCombinations.
     * @example
     * // Update many SecretCombinations
     * const secretCombination = await prisma.secretCombination.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SecretCombinations and only return the `id`
     * const secretCombinationWithIdOnly = await prisma.secretCombination.updateManyAndReturn({
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
    updateManyAndReturn<T extends SecretCombinationUpdateManyAndReturnArgs>(args: SelectSubset<T, SecretCombinationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SecretCombinationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SecretCombination.
     * @param {SecretCombinationUpsertArgs} args - Arguments to update or create a SecretCombination.
     * @example
     * // Update or create a SecretCombination
     * const secretCombination = await prisma.secretCombination.upsert({
     *   create: {
     *     // ... data to create a SecretCombination
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SecretCombination we want to update
     *   }
     * })
     */
    upsert<T extends SecretCombinationUpsertArgs>(args: SelectSubset<T, SecretCombinationUpsertArgs<ExtArgs>>): Prisma__SecretCombinationClient<$Result.GetResult<Prisma.$SecretCombinationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SecretCombinations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SecretCombinationCountArgs} args - Arguments to filter SecretCombinations to count.
     * @example
     * // Count the number of SecretCombinations
     * const count = await prisma.secretCombination.count({
     *   where: {
     *     // ... the filter for the SecretCombinations we want to count
     *   }
     * })
    **/
    count<T extends SecretCombinationCountArgs>(
      args?: Subset<T, SecretCombinationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SecretCombinationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SecretCombination.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SecretCombinationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SecretCombinationAggregateArgs>(args: Subset<T, SecretCombinationAggregateArgs>): Prisma.PrismaPromise<GetSecretCombinationAggregateType<T>>

    /**
     * Group by SecretCombination.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SecretCombinationGroupByArgs} args - Group by arguments.
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
      T extends SecretCombinationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SecretCombinationGroupByArgs['orderBy'] }
        : { orderBy?: SecretCombinationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SecretCombinationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSecretCombinationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SecretCombination model
   */
  readonly fields: SecretCombinationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SecretCombination.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SecretCombinationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    foundBy<T extends SecretCombination$foundByArgs<ExtArgs> = {}>(args?: Subset<T, SecretCombination$foundByArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the SecretCombination model
   */
  interface SecretCombinationFieldRefs {
    readonly id: FieldRef<"SecretCombination", 'String'>
    readonly assetOne: FieldRef<"SecretCombination", 'AssetName'>
    readonly assetTwo: FieldRef<"SecretCombination", 'AssetName'>
    readonly assetThree: FieldRef<"SecretCombination", 'AssetName'>
    readonly assetFour: FieldRef<"SecretCombination", 'AssetName'>
    readonly sound: FieldRef<"SecretCombination", 'Sound'>
    readonly foundById: FieldRef<"SecretCombination", 'String'>
    readonly foundByEmail: FieldRef<"SecretCombination", 'String'>
    readonly foundAt: FieldRef<"SecretCombination", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SecretCombination findUnique
   */
  export type SecretCombinationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecretCombination
     */
    select?: SecretCombinationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SecretCombination
     */
    omit?: SecretCombinationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SecretCombinationInclude<ExtArgs> | null
    /**
     * Filter, which SecretCombination to fetch.
     */
    where: SecretCombinationWhereUniqueInput
  }

  /**
   * SecretCombination findUniqueOrThrow
   */
  export type SecretCombinationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecretCombination
     */
    select?: SecretCombinationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SecretCombination
     */
    omit?: SecretCombinationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SecretCombinationInclude<ExtArgs> | null
    /**
     * Filter, which SecretCombination to fetch.
     */
    where: SecretCombinationWhereUniqueInput
  }

  /**
   * SecretCombination findFirst
   */
  export type SecretCombinationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecretCombination
     */
    select?: SecretCombinationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SecretCombination
     */
    omit?: SecretCombinationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SecretCombinationInclude<ExtArgs> | null
    /**
     * Filter, which SecretCombination to fetch.
     */
    where?: SecretCombinationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SecretCombinations to fetch.
     */
    orderBy?: SecretCombinationOrderByWithRelationInput | SecretCombinationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SecretCombinations.
     */
    cursor?: SecretCombinationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SecretCombinations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SecretCombinations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SecretCombinations.
     */
    distinct?: SecretCombinationScalarFieldEnum | SecretCombinationScalarFieldEnum[]
  }

  /**
   * SecretCombination findFirstOrThrow
   */
  export type SecretCombinationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecretCombination
     */
    select?: SecretCombinationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SecretCombination
     */
    omit?: SecretCombinationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SecretCombinationInclude<ExtArgs> | null
    /**
     * Filter, which SecretCombination to fetch.
     */
    where?: SecretCombinationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SecretCombinations to fetch.
     */
    orderBy?: SecretCombinationOrderByWithRelationInput | SecretCombinationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SecretCombinations.
     */
    cursor?: SecretCombinationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SecretCombinations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SecretCombinations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SecretCombinations.
     */
    distinct?: SecretCombinationScalarFieldEnum | SecretCombinationScalarFieldEnum[]
  }

  /**
   * SecretCombination findMany
   */
  export type SecretCombinationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecretCombination
     */
    select?: SecretCombinationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SecretCombination
     */
    omit?: SecretCombinationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SecretCombinationInclude<ExtArgs> | null
    /**
     * Filter, which SecretCombinations to fetch.
     */
    where?: SecretCombinationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SecretCombinations to fetch.
     */
    orderBy?: SecretCombinationOrderByWithRelationInput | SecretCombinationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SecretCombinations.
     */
    cursor?: SecretCombinationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SecretCombinations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SecretCombinations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SecretCombinations.
     */
    distinct?: SecretCombinationScalarFieldEnum | SecretCombinationScalarFieldEnum[]
  }

  /**
   * SecretCombination create
   */
  export type SecretCombinationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecretCombination
     */
    select?: SecretCombinationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SecretCombination
     */
    omit?: SecretCombinationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SecretCombinationInclude<ExtArgs> | null
    /**
     * The data needed to create a SecretCombination.
     */
    data: XOR<SecretCombinationCreateInput, SecretCombinationUncheckedCreateInput>
  }

  /**
   * SecretCombination createMany
   */
  export type SecretCombinationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SecretCombinations.
     */
    data: SecretCombinationCreateManyInput | SecretCombinationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SecretCombination createManyAndReturn
   */
  export type SecretCombinationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecretCombination
     */
    select?: SecretCombinationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SecretCombination
     */
    omit?: SecretCombinationOmit<ExtArgs> | null
    /**
     * The data used to create many SecretCombinations.
     */
    data: SecretCombinationCreateManyInput | SecretCombinationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SecretCombinationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SecretCombination update
   */
  export type SecretCombinationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecretCombination
     */
    select?: SecretCombinationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SecretCombination
     */
    omit?: SecretCombinationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SecretCombinationInclude<ExtArgs> | null
    /**
     * The data needed to update a SecretCombination.
     */
    data: XOR<SecretCombinationUpdateInput, SecretCombinationUncheckedUpdateInput>
    /**
     * Choose, which SecretCombination to update.
     */
    where: SecretCombinationWhereUniqueInput
  }

  /**
   * SecretCombination updateMany
   */
  export type SecretCombinationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SecretCombinations.
     */
    data: XOR<SecretCombinationUpdateManyMutationInput, SecretCombinationUncheckedUpdateManyInput>
    /**
     * Filter which SecretCombinations to update
     */
    where?: SecretCombinationWhereInput
    /**
     * Limit how many SecretCombinations to update.
     */
    limit?: number
  }

  /**
   * SecretCombination updateManyAndReturn
   */
  export type SecretCombinationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecretCombination
     */
    select?: SecretCombinationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SecretCombination
     */
    omit?: SecretCombinationOmit<ExtArgs> | null
    /**
     * The data used to update SecretCombinations.
     */
    data: XOR<SecretCombinationUpdateManyMutationInput, SecretCombinationUncheckedUpdateManyInput>
    /**
     * Filter which SecretCombinations to update
     */
    where?: SecretCombinationWhereInput
    /**
     * Limit how many SecretCombinations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SecretCombinationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SecretCombination upsert
   */
  export type SecretCombinationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecretCombination
     */
    select?: SecretCombinationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SecretCombination
     */
    omit?: SecretCombinationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SecretCombinationInclude<ExtArgs> | null
    /**
     * The filter to search for the SecretCombination to update in case it exists.
     */
    where: SecretCombinationWhereUniqueInput
    /**
     * In case the SecretCombination found by the `where` argument doesn't exist, create a new SecretCombination with this data.
     */
    create: XOR<SecretCombinationCreateInput, SecretCombinationUncheckedCreateInput>
    /**
     * In case the SecretCombination was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SecretCombinationUpdateInput, SecretCombinationUncheckedUpdateInput>
  }

  /**
   * SecretCombination delete
   */
  export type SecretCombinationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecretCombination
     */
    select?: SecretCombinationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SecretCombination
     */
    omit?: SecretCombinationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SecretCombinationInclude<ExtArgs> | null
    /**
     * Filter which SecretCombination to delete.
     */
    where: SecretCombinationWhereUniqueInput
  }

  /**
   * SecretCombination deleteMany
   */
  export type SecretCombinationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SecretCombinations to delete
     */
    where?: SecretCombinationWhereInput
    /**
     * Limit how many SecretCombinations to delete.
     */
    limit?: number
  }

  /**
   * SecretCombination.foundBy
   */
  export type SecretCombination$foundByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
    where?: UserWhereInput
  }

  /**
   * SecretCombination without action
   */
  export type SecretCombinationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecretCombination
     */
    select?: SecretCombinationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SecretCombination
     */
    omit?: SecretCombinationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SecretCombinationInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    nickname: 'nickname'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const AssetScalarFieldEnum: {
    id: 'id',
    name: 'name',
    thumbnail: 'thumbnail',
    video: 'video',
    description: 'description',
    type: 'type',
    durationSec: 'durationSec',
    nbUav: 'nbUav',
    createdAt: 'createdAt',
    tags: 'tags'
  };

  export type AssetScalarFieldEnum = (typeof AssetScalarFieldEnum)[keyof typeof AssetScalarFieldEnum]


  export const CombinationScalarFieldEnum: {
    id: 'id',
    assetOne: 'assetOne',
    assetTwo: 'assetTwo',
    assetThree: 'assetThree',
    assetFour: 'assetFour',
    foundAt: 'foundAt',
    foundById: 'foundById',
    sound: 'sound'
  };

  export type CombinationScalarFieldEnum = (typeof CombinationScalarFieldEnum)[keyof typeof CombinationScalarFieldEnum]


  export const SecretCombinationScalarFieldEnum: {
    id: 'id',
    assetOne: 'assetOne',
    assetTwo: 'assetTwo',
    assetThree: 'assetThree',
    assetFour: 'assetFour',
    sound: 'sound',
    foundById: 'foundById',
    foundByEmail: 'foundByEmail',
    foundAt: 'foundAt'
  };

  export type SecretCombinationScalarFieldEnum = (typeof SecretCombinationScalarFieldEnum)[keyof typeof SecretCombinationScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


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
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'AssetName'
   */
  export type EnumAssetNameFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AssetName'>
    


  /**
   * Reference to a field of type 'AssetName[]'
   */
  export type ListEnumAssetNameFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AssetName[]'>
    


  /**
   * Reference to a field of type 'AssetType'
   */
  export type EnumAssetTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AssetType'>
    


  /**
   * Reference to a field of type 'AssetType[]'
   */
  export type ListEnumAssetTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AssetType[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Sound'
   */
  export type EnumSoundFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Sound'>
    


  /**
   * Reference to a field of type 'Sound[]'
   */
  export type ListEnumSoundFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Sound[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    nickname?: StringFilter<"User"> | string
    combinations?: CombinationListRelationFilter
    secretCombinations?: SecretCombinationListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    nickname?: SortOrder
    combinations?: CombinationOrderByRelationAggregateInput
    secretCombinations?: SecretCombinationOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    nickname?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    combinations?: CombinationListRelationFilter
    secretCombinations?: SecretCombinationListRelationFilter
  }, "id" | "nickname">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    nickname?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    nickname?: StringWithAggregatesFilter<"User"> | string
  }

  export type AssetWhereInput = {
    AND?: AssetWhereInput | AssetWhereInput[]
    OR?: AssetWhereInput[]
    NOT?: AssetWhereInput | AssetWhereInput[]
    id?: StringFilter<"Asset"> | string
    name?: EnumAssetNameFilter<"Asset"> | $Enums.AssetName
    thumbnail?: StringFilter<"Asset"> | string
    video?: StringNullableFilter<"Asset"> | string | null
    description?: StringFilter<"Asset"> | string
    type?: EnumAssetTypeFilter<"Asset"> | $Enums.AssetType
    durationSec?: IntNullableFilter<"Asset"> | number | null
    nbUav?: IntNullableFilter<"Asset"> | number | null
    createdAt?: DateTimeFilter<"Asset"> | Date | string
    tags?: StringNullableListFilter<"Asset">
  }

  export type AssetOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    thumbnail?: SortOrder
    video?: SortOrderInput | SortOrder
    description?: SortOrder
    type?: SortOrder
    durationSec?: SortOrderInput | SortOrder
    nbUav?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    tags?: SortOrder
  }

  export type AssetWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AssetWhereInput | AssetWhereInput[]
    OR?: AssetWhereInput[]
    NOT?: AssetWhereInput | AssetWhereInput[]
    name?: EnumAssetNameFilter<"Asset"> | $Enums.AssetName
    thumbnail?: StringFilter<"Asset"> | string
    video?: StringNullableFilter<"Asset"> | string | null
    description?: StringFilter<"Asset"> | string
    type?: EnumAssetTypeFilter<"Asset"> | $Enums.AssetType
    durationSec?: IntNullableFilter<"Asset"> | number | null
    nbUav?: IntNullableFilter<"Asset"> | number | null
    createdAt?: DateTimeFilter<"Asset"> | Date | string
    tags?: StringNullableListFilter<"Asset">
  }, "id">

  export type AssetOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    thumbnail?: SortOrder
    video?: SortOrderInput | SortOrder
    description?: SortOrder
    type?: SortOrder
    durationSec?: SortOrderInput | SortOrder
    nbUav?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    tags?: SortOrder
    _count?: AssetCountOrderByAggregateInput
    _avg?: AssetAvgOrderByAggregateInput
    _max?: AssetMaxOrderByAggregateInput
    _min?: AssetMinOrderByAggregateInput
    _sum?: AssetSumOrderByAggregateInput
  }

  export type AssetScalarWhereWithAggregatesInput = {
    AND?: AssetScalarWhereWithAggregatesInput | AssetScalarWhereWithAggregatesInput[]
    OR?: AssetScalarWhereWithAggregatesInput[]
    NOT?: AssetScalarWhereWithAggregatesInput | AssetScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Asset"> | string
    name?: EnumAssetNameWithAggregatesFilter<"Asset"> | $Enums.AssetName
    thumbnail?: StringWithAggregatesFilter<"Asset"> | string
    video?: StringNullableWithAggregatesFilter<"Asset"> | string | null
    description?: StringWithAggregatesFilter<"Asset"> | string
    type?: EnumAssetTypeWithAggregatesFilter<"Asset"> | $Enums.AssetType
    durationSec?: IntNullableWithAggregatesFilter<"Asset"> | number | null
    nbUav?: IntNullableWithAggregatesFilter<"Asset"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"Asset"> | Date | string
    tags?: StringNullableListFilter<"Asset">
  }

  export type CombinationWhereInput = {
    AND?: CombinationWhereInput | CombinationWhereInput[]
    OR?: CombinationWhereInput[]
    NOT?: CombinationWhereInput | CombinationWhereInput[]
    id?: StringFilter<"Combination"> | string
    assetOne?: EnumAssetNameFilter<"Combination"> | $Enums.AssetName
    assetTwo?: EnumAssetNameNullableFilter<"Combination"> | $Enums.AssetName | null
    assetThree?: EnumAssetNameNullableFilter<"Combination"> | $Enums.AssetName | null
    assetFour?: EnumAssetNameNullableFilter<"Combination"> | $Enums.AssetName | null
    foundAt?: DateTimeFilter<"Combination"> | Date | string
    foundById?: StringFilter<"Combination"> | string
    sound?: EnumSoundFilter<"Combination"> | $Enums.Sound
    foundBy?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type CombinationOrderByWithRelationInput = {
    id?: SortOrder
    assetOne?: SortOrder
    assetTwo?: SortOrderInput | SortOrder
    assetThree?: SortOrderInput | SortOrder
    assetFour?: SortOrderInput | SortOrder
    foundAt?: SortOrder
    foundById?: SortOrder
    sound?: SortOrder
    foundBy?: UserOrderByWithRelationInput
  }

  export type CombinationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    assetOne_assetTwo_assetThree_assetFour_sound_foundById?: CombinationAssetOneAssetTwoAssetThreeAssetFourSoundFoundByIdCompoundUniqueInput
    AND?: CombinationWhereInput | CombinationWhereInput[]
    OR?: CombinationWhereInput[]
    NOT?: CombinationWhereInput | CombinationWhereInput[]
    assetOne?: EnumAssetNameFilter<"Combination"> | $Enums.AssetName
    assetTwo?: EnumAssetNameNullableFilter<"Combination"> | $Enums.AssetName | null
    assetThree?: EnumAssetNameNullableFilter<"Combination"> | $Enums.AssetName | null
    assetFour?: EnumAssetNameNullableFilter<"Combination"> | $Enums.AssetName | null
    foundAt?: DateTimeFilter<"Combination"> | Date | string
    foundById?: StringFilter<"Combination"> | string
    sound?: EnumSoundFilter<"Combination"> | $Enums.Sound
    foundBy?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "assetOne_assetTwo_assetThree_assetFour_sound_foundById">

  export type CombinationOrderByWithAggregationInput = {
    id?: SortOrder
    assetOne?: SortOrder
    assetTwo?: SortOrderInput | SortOrder
    assetThree?: SortOrderInput | SortOrder
    assetFour?: SortOrderInput | SortOrder
    foundAt?: SortOrder
    foundById?: SortOrder
    sound?: SortOrder
    _count?: CombinationCountOrderByAggregateInput
    _max?: CombinationMaxOrderByAggregateInput
    _min?: CombinationMinOrderByAggregateInput
  }

  export type CombinationScalarWhereWithAggregatesInput = {
    AND?: CombinationScalarWhereWithAggregatesInput | CombinationScalarWhereWithAggregatesInput[]
    OR?: CombinationScalarWhereWithAggregatesInput[]
    NOT?: CombinationScalarWhereWithAggregatesInput | CombinationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Combination"> | string
    assetOne?: EnumAssetNameWithAggregatesFilter<"Combination"> | $Enums.AssetName
    assetTwo?: EnumAssetNameNullableWithAggregatesFilter<"Combination"> | $Enums.AssetName | null
    assetThree?: EnumAssetNameNullableWithAggregatesFilter<"Combination"> | $Enums.AssetName | null
    assetFour?: EnumAssetNameNullableWithAggregatesFilter<"Combination"> | $Enums.AssetName | null
    foundAt?: DateTimeWithAggregatesFilter<"Combination"> | Date | string
    foundById?: StringWithAggregatesFilter<"Combination"> | string
    sound?: EnumSoundWithAggregatesFilter<"Combination"> | $Enums.Sound
  }

  export type SecretCombinationWhereInput = {
    AND?: SecretCombinationWhereInput | SecretCombinationWhereInput[]
    OR?: SecretCombinationWhereInput[]
    NOT?: SecretCombinationWhereInput | SecretCombinationWhereInput[]
    id?: StringFilter<"SecretCombination"> | string
    assetOne?: EnumAssetNameFilter<"SecretCombination"> | $Enums.AssetName
    assetTwo?: EnumAssetNameNullableFilter<"SecretCombination"> | $Enums.AssetName | null
    assetThree?: EnumAssetNameNullableFilter<"SecretCombination"> | $Enums.AssetName | null
    assetFour?: EnumAssetNameNullableFilter<"SecretCombination"> | $Enums.AssetName | null
    sound?: EnumSoundFilter<"SecretCombination"> | $Enums.Sound
    foundById?: StringNullableFilter<"SecretCombination"> | string | null
    foundByEmail?: StringNullableFilter<"SecretCombination"> | string | null
    foundAt?: DateTimeNullableFilter<"SecretCombination"> | Date | string | null
    foundBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type SecretCombinationOrderByWithRelationInput = {
    id?: SortOrder
    assetOne?: SortOrder
    assetTwo?: SortOrderInput | SortOrder
    assetThree?: SortOrderInput | SortOrder
    assetFour?: SortOrderInput | SortOrder
    sound?: SortOrder
    foundById?: SortOrderInput | SortOrder
    foundByEmail?: SortOrderInput | SortOrder
    foundAt?: SortOrderInput | SortOrder
    foundBy?: UserOrderByWithRelationInput
  }

  export type SecretCombinationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    assetOne_assetTwo_assetThree_assetFour_sound?: SecretCombinationAssetOneAssetTwoAssetThreeAssetFourSoundCompoundUniqueInput
    AND?: SecretCombinationWhereInput | SecretCombinationWhereInput[]
    OR?: SecretCombinationWhereInput[]
    NOT?: SecretCombinationWhereInput | SecretCombinationWhereInput[]
    assetOne?: EnumAssetNameFilter<"SecretCombination"> | $Enums.AssetName
    assetTwo?: EnumAssetNameNullableFilter<"SecretCombination"> | $Enums.AssetName | null
    assetThree?: EnumAssetNameNullableFilter<"SecretCombination"> | $Enums.AssetName | null
    assetFour?: EnumAssetNameNullableFilter<"SecretCombination"> | $Enums.AssetName | null
    sound?: EnumSoundFilter<"SecretCombination"> | $Enums.Sound
    foundById?: StringNullableFilter<"SecretCombination"> | string | null
    foundByEmail?: StringNullableFilter<"SecretCombination"> | string | null
    foundAt?: DateTimeNullableFilter<"SecretCombination"> | Date | string | null
    foundBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id" | "assetOne_assetTwo_assetThree_assetFour_sound">

  export type SecretCombinationOrderByWithAggregationInput = {
    id?: SortOrder
    assetOne?: SortOrder
    assetTwo?: SortOrderInput | SortOrder
    assetThree?: SortOrderInput | SortOrder
    assetFour?: SortOrderInput | SortOrder
    sound?: SortOrder
    foundById?: SortOrderInput | SortOrder
    foundByEmail?: SortOrderInput | SortOrder
    foundAt?: SortOrderInput | SortOrder
    _count?: SecretCombinationCountOrderByAggregateInput
    _max?: SecretCombinationMaxOrderByAggregateInput
    _min?: SecretCombinationMinOrderByAggregateInput
  }

  export type SecretCombinationScalarWhereWithAggregatesInput = {
    AND?: SecretCombinationScalarWhereWithAggregatesInput | SecretCombinationScalarWhereWithAggregatesInput[]
    OR?: SecretCombinationScalarWhereWithAggregatesInput[]
    NOT?: SecretCombinationScalarWhereWithAggregatesInput | SecretCombinationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SecretCombination"> | string
    assetOne?: EnumAssetNameWithAggregatesFilter<"SecretCombination"> | $Enums.AssetName
    assetTwo?: EnumAssetNameNullableWithAggregatesFilter<"SecretCombination"> | $Enums.AssetName | null
    assetThree?: EnumAssetNameNullableWithAggregatesFilter<"SecretCombination"> | $Enums.AssetName | null
    assetFour?: EnumAssetNameNullableWithAggregatesFilter<"SecretCombination"> | $Enums.AssetName | null
    sound?: EnumSoundWithAggregatesFilter<"SecretCombination"> | $Enums.Sound
    foundById?: StringNullableWithAggregatesFilter<"SecretCombination"> | string | null
    foundByEmail?: StringNullableWithAggregatesFilter<"SecretCombination"> | string | null
    foundAt?: DateTimeNullableWithAggregatesFilter<"SecretCombination"> | Date | string | null
  }

  export type UserCreateInput = {
    id?: string
    nickname: string
    combinations?: CombinationCreateNestedManyWithoutFoundByInput
    secretCombinations?: SecretCombinationCreateNestedManyWithoutFoundByInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    nickname: string
    combinations?: CombinationUncheckedCreateNestedManyWithoutFoundByInput
    secretCombinations?: SecretCombinationUncheckedCreateNestedManyWithoutFoundByInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    combinations?: CombinationUpdateManyWithoutFoundByNestedInput
    secretCombinations?: SecretCombinationUpdateManyWithoutFoundByNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    combinations?: CombinationUncheckedUpdateManyWithoutFoundByNestedInput
    secretCombinations?: SecretCombinationUncheckedUpdateManyWithoutFoundByNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    nickname: string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
  }

  export type AssetCreateInput = {
    id?: string
    name: $Enums.AssetName
    thumbnail?: string
    video?: string | null
    description: string
    type: $Enums.AssetType
    durationSec?: number | null
    nbUav?: number | null
    createdAt?: Date | string
    tags?: AssetCreatetagsInput | string[]
  }

  export type AssetUncheckedCreateInput = {
    id?: string
    name: $Enums.AssetName
    thumbnail?: string
    video?: string | null
    description: string
    type: $Enums.AssetType
    durationSec?: number | null
    nbUav?: number | null
    createdAt?: Date | string
    tags?: AssetCreatetagsInput | string[]
  }

  export type AssetUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: EnumAssetNameFieldUpdateOperationsInput | $Enums.AssetName
    thumbnail?: StringFieldUpdateOperationsInput | string
    video?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    type?: EnumAssetTypeFieldUpdateOperationsInput | $Enums.AssetType
    durationSec?: NullableIntFieldUpdateOperationsInput | number | null
    nbUav?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: AssetUpdatetagsInput | string[]
  }

  export type AssetUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: EnumAssetNameFieldUpdateOperationsInput | $Enums.AssetName
    thumbnail?: StringFieldUpdateOperationsInput | string
    video?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    type?: EnumAssetTypeFieldUpdateOperationsInput | $Enums.AssetType
    durationSec?: NullableIntFieldUpdateOperationsInput | number | null
    nbUav?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: AssetUpdatetagsInput | string[]
  }

  export type AssetCreateManyInput = {
    id?: string
    name: $Enums.AssetName
    thumbnail?: string
    video?: string | null
    description: string
    type: $Enums.AssetType
    durationSec?: number | null
    nbUav?: number | null
    createdAt?: Date | string
    tags?: AssetCreatetagsInput | string[]
  }

  export type AssetUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: EnumAssetNameFieldUpdateOperationsInput | $Enums.AssetName
    thumbnail?: StringFieldUpdateOperationsInput | string
    video?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    type?: EnumAssetTypeFieldUpdateOperationsInput | $Enums.AssetType
    durationSec?: NullableIntFieldUpdateOperationsInput | number | null
    nbUav?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: AssetUpdatetagsInput | string[]
  }

  export type AssetUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: EnumAssetNameFieldUpdateOperationsInput | $Enums.AssetName
    thumbnail?: StringFieldUpdateOperationsInput | string
    video?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    type?: EnumAssetTypeFieldUpdateOperationsInput | $Enums.AssetType
    durationSec?: NullableIntFieldUpdateOperationsInput | number | null
    nbUav?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: AssetUpdatetagsInput | string[]
  }

  export type CombinationCreateInput = {
    id?: string
    assetOne: $Enums.AssetName
    assetTwo?: $Enums.AssetName | null
    assetThree?: $Enums.AssetName | null
    assetFour?: $Enums.AssetName | null
    foundAt?: Date | string
    sound?: $Enums.Sound
    foundBy: UserCreateNestedOneWithoutCombinationsInput
  }

  export type CombinationUncheckedCreateInput = {
    id?: string
    assetOne: $Enums.AssetName
    assetTwo?: $Enums.AssetName | null
    assetThree?: $Enums.AssetName | null
    assetFour?: $Enums.AssetName | null
    foundAt?: Date | string
    foundById: string
    sound?: $Enums.Sound
  }

  export type CombinationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    assetOne?: EnumAssetNameFieldUpdateOperationsInput | $Enums.AssetName
    assetTwo?: NullableEnumAssetNameFieldUpdateOperationsInput | $Enums.AssetName | null
    assetThree?: NullableEnumAssetNameFieldUpdateOperationsInput | $Enums.AssetName | null
    assetFour?: NullableEnumAssetNameFieldUpdateOperationsInput | $Enums.AssetName | null
    foundAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sound?: EnumSoundFieldUpdateOperationsInput | $Enums.Sound
    foundBy?: UserUpdateOneRequiredWithoutCombinationsNestedInput
  }

  export type CombinationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    assetOne?: EnumAssetNameFieldUpdateOperationsInput | $Enums.AssetName
    assetTwo?: NullableEnumAssetNameFieldUpdateOperationsInput | $Enums.AssetName | null
    assetThree?: NullableEnumAssetNameFieldUpdateOperationsInput | $Enums.AssetName | null
    assetFour?: NullableEnumAssetNameFieldUpdateOperationsInput | $Enums.AssetName | null
    foundAt?: DateTimeFieldUpdateOperationsInput | Date | string
    foundById?: StringFieldUpdateOperationsInput | string
    sound?: EnumSoundFieldUpdateOperationsInput | $Enums.Sound
  }

  export type CombinationCreateManyInput = {
    id?: string
    assetOne: $Enums.AssetName
    assetTwo?: $Enums.AssetName | null
    assetThree?: $Enums.AssetName | null
    assetFour?: $Enums.AssetName | null
    foundAt?: Date | string
    foundById: string
    sound?: $Enums.Sound
  }

  export type CombinationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    assetOne?: EnumAssetNameFieldUpdateOperationsInput | $Enums.AssetName
    assetTwo?: NullableEnumAssetNameFieldUpdateOperationsInput | $Enums.AssetName | null
    assetThree?: NullableEnumAssetNameFieldUpdateOperationsInput | $Enums.AssetName | null
    assetFour?: NullableEnumAssetNameFieldUpdateOperationsInput | $Enums.AssetName | null
    foundAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sound?: EnumSoundFieldUpdateOperationsInput | $Enums.Sound
  }

  export type CombinationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    assetOne?: EnumAssetNameFieldUpdateOperationsInput | $Enums.AssetName
    assetTwo?: NullableEnumAssetNameFieldUpdateOperationsInput | $Enums.AssetName | null
    assetThree?: NullableEnumAssetNameFieldUpdateOperationsInput | $Enums.AssetName | null
    assetFour?: NullableEnumAssetNameFieldUpdateOperationsInput | $Enums.AssetName | null
    foundAt?: DateTimeFieldUpdateOperationsInput | Date | string
    foundById?: StringFieldUpdateOperationsInput | string
    sound?: EnumSoundFieldUpdateOperationsInput | $Enums.Sound
  }

  export type SecretCombinationCreateInput = {
    id?: string
    assetOne: $Enums.AssetName
    assetTwo?: $Enums.AssetName | null
    assetThree?: $Enums.AssetName | null
    assetFour?: $Enums.AssetName | null
    sound?: $Enums.Sound
    foundByEmail?: string | null
    foundAt?: Date | string | null
    foundBy?: UserCreateNestedOneWithoutSecretCombinationsInput
  }

  export type SecretCombinationUncheckedCreateInput = {
    id?: string
    assetOne: $Enums.AssetName
    assetTwo?: $Enums.AssetName | null
    assetThree?: $Enums.AssetName | null
    assetFour?: $Enums.AssetName | null
    sound?: $Enums.Sound
    foundById?: string | null
    foundByEmail?: string | null
    foundAt?: Date | string | null
  }

  export type SecretCombinationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    assetOne?: EnumAssetNameFieldUpdateOperationsInput | $Enums.AssetName
    assetTwo?: NullableEnumAssetNameFieldUpdateOperationsInput | $Enums.AssetName | null
    assetThree?: NullableEnumAssetNameFieldUpdateOperationsInput | $Enums.AssetName | null
    assetFour?: NullableEnumAssetNameFieldUpdateOperationsInput | $Enums.AssetName | null
    sound?: EnumSoundFieldUpdateOperationsInput | $Enums.Sound
    foundByEmail?: NullableStringFieldUpdateOperationsInput | string | null
    foundAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    foundBy?: UserUpdateOneWithoutSecretCombinationsNestedInput
  }

  export type SecretCombinationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    assetOne?: EnumAssetNameFieldUpdateOperationsInput | $Enums.AssetName
    assetTwo?: NullableEnumAssetNameFieldUpdateOperationsInput | $Enums.AssetName | null
    assetThree?: NullableEnumAssetNameFieldUpdateOperationsInput | $Enums.AssetName | null
    assetFour?: NullableEnumAssetNameFieldUpdateOperationsInput | $Enums.AssetName | null
    sound?: EnumSoundFieldUpdateOperationsInput | $Enums.Sound
    foundById?: NullableStringFieldUpdateOperationsInput | string | null
    foundByEmail?: NullableStringFieldUpdateOperationsInput | string | null
    foundAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SecretCombinationCreateManyInput = {
    id?: string
    assetOne: $Enums.AssetName
    assetTwo?: $Enums.AssetName | null
    assetThree?: $Enums.AssetName | null
    assetFour?: $Enums.AssetName | null
    sound?: $Enums.Sound
    foundById?: string | null
    foundByEmail?: string | null
    foundAt?: Date | string | null
  }

  export type SecretCombinationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    assetOne?: EnumAssetNameFieldUpdateOperationsInput | $Enums.AssetName
    assetTwo?: NullableEnumAssetNameFieldUpdateOperationsInput | $Enums.AssetName | null
    assetThree?: NullableEnumAssetNameFieldUpdateOperationsInput | $Enums.AssetName | null
    assetFour?: NullableEnumAssetNameFieldUpdateOperationsInput | $Enums.AssetName | null
    sound?: EnumSoundFieldUpdateOperationsInput | $Enums.Sound
    foundByEmail?: NullableStringFieldUpdateOperationsInput | string | null
    foundAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SecretCombinationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    assetOne?: EnumAssetNameFieldUpdateOperationsInput | $Enums.AssetName
    assetTwo?: NullableEnumAssetNameFieldUpdateOperationsInput | $Enums.AssetName | null
    assetThree?: NullableEnumAssetNameFieldUpdateOperationsInput | $Enums.AssetName | null
    assetFour?: NullableEnumAssetNameFieldUpdateOperationsInput | $Enums.AssetName | null
    sound?: EnumSoundFieldUpdateOperationsInput | $Enums.Sound
    foundById?: NullableStringFieldUpdateOperationsInput | string | null
    foundByEmail?: NullableStringFieldUpdateOperationsInput | string | null
    foundAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type CombinationListRelationFilter = {
    every?: CombinationWhereInput
    some?: CombinationWhereInput
    none?: CombinationWhereInput
  }

  export type SecretCombinationListRelationFilter = {
    every?: SecretCombinationWhereInput
    some?: SecretCombinationWhereInput
    none?: SecretCombinationWhereInput
  }

  export type CombinationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SecretCombinationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    nickname?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    nickname?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    nickname?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumAssetNameFilter<$PrismaModel = never> = {
    equals?: $Enums.AssetName | EnumAssetNameFieldRefInput<$PrismaModel>
    in?: $Enums.AssetName[] | ListEnumAssetNameFieldRefInput<$PrismaModel>
    notIn?: $Enums.AssetName[] | ListEnumAssetNameFieldRefInput<$PrismaModel>
    not?: NestedEnumAssetNameFilter<$PrismaModel> | $Enums.AssetName
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumAssetTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AssetType | EnumAssetTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AssetType[] | ListEnumAssetTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AssetType[] | ListEnumAssetTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAssetTypeFilter<$PrismaModel> | $Enums.AssetType
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AssetCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    thumbnail?: SortOrder
    video?: SortOrder
    description?: SortOrder
    type?: SortOrder
    durationSec?: SortOrder
    nbUav?: SortOrder
    createdAt?: SortOrder
    tags?: SortOrder
  }

  export type AssetAvgOrderByAggregateInput = {
    durationSec?: SortOrder
    nbUav?: SortOrder
  }

  export type AssetMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    thumbnail?: SortOrder
    video?: SortOrder
    description?: SortOrder
    type?: SortOrder
    durationSec?: SortOrder
    nbUav?: SortOrder
    createdAt?: SortOrder
  }

  export type AssetMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    thumbnail?: SortOrder
    video?: SortOrder
    description?: SortOrder
    type?: SortOrder
    durationSec?: SortOrder
    nbUav?: SortOrder
    createdAt?: SortOrder
  }

  export type AssetSumOrderByAggregateInput = {
    durationSec?: SortOrder
    nbUav?: SortOrder
  }

  export type EnumAssetNameWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AssetName | EnumAssetNameFieldRefInput<$PrismaModel>
    in?: $Enums.AssetName[] | ListEnumAssetNameFieldRefInput<$PrismaModel>
    notIn?: $Enums.AssetName[] | ListEnumAssetNameFieldRefInput<$PrismaModel>
    not?: NestedEnumAssetNameWithAggregatesFilter<$PrismaModel> | $Enums.AssetName
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAssetNameFilter<$PrismaModel>
    _max?: NestedEnumAssetNameFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumAssetTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AssetType | EnumAssetTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AssetType[] | ListEnumAssetTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AssetType[] | ListEnumAssetTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAssetTypeWithAggregatesFilter<$PrismaModel> | $Enums.AssetType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAssetTypeFilter<$PrismaModel>
    _max?: NestedEnumAssetTypeFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
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

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumAssetNameNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.AssetName | EnumAssetNameFieldRefInput<$PrismaModel> | null
    in?: $Enums.AssetName[] | ListEnumAssetNameFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.AssetName[] | ListEnumAssetNameFieldRefInput<$PrismaModel> | null
    not?: NestedEnumAssetNameNullableFilter<$PrismaModel> | $Enums.AssetName | null
  }

  export type EnumSoundFilter<$PrismaModel = never> = {
    equals?: $Enums.Sound | EnumSoundFieldRefInput<$PrismaModel>
    in?: $Enums.Sound[] | ListEnumSoundFieldRefInput<$PrismaModel>
    notIn?: $Enums.Sound[] | ListEnumSoundFieldRefInput<$PrismaModel>
    not?: NestedEnumSoundFilter<$PrismaModel> | $Enums.Sound
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type CombinationAssetOneAssetTwoAssetThreeAssetFourSoundFoundByIdCompoundUniqueInput = {
    assetOne: $Enums.AssetName
    assetTwo: $Enums.AssetName
    assetThree: $Enums.AssetName
    assetFour: $Enums.AssetName
    sound: $Enums.Sound
    foundById: string
  }

  export type CombinationCountOrderByAggregateInput = {
    id?: SortOrder
    assetOne?: SortOrder
    assetTwo?: SortOrder
    assetThree?: SortOrder
    assetFour?: SortOrder
    foundAt?: SortOrder
    foundById?: SortOrder
    sound?: SortOrder
  }

  export type CombinationMaxOrderByAggregateInput = {
    id?: SortOrder
    assetOne?: SortOrder
    assetTwo?: SortOrder
    assetThree?: SortOrder
    assetFour?: SortOrder
    foundAt?: SortOrder
    foundById?: SortOrder
    sound?: SortOrder
  }

  export type CombinationMinOrderByAggregateInput = {
    id?: SortOrder
    assetOne?: SortOrder
    assetTwo?: SortOrder
    assetThree?: SortOrder
    assetFour?: SortOrder
    foundAt?: SortOrder
    foundById?: SortOrder
    sound?: SortOrder
  }

  export type EnumAssetNameNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AssetName | EnumAssetNameFieldRefInput<$PrismaModel> | null
    in?: $Enums.AssetName[] | ListEnumAssetNameFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.AssetName[] | ListEnumAssetNameFieldRefInput<$PrismaModel> | null
    not?: NestedEnumAssetNameNullableWithAggregatesFilter<$PrismaModel> | $Enums.AssetName | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumAssetNameNullableFilter<$PrismaModel>
    _max?: NestedEnumAssetNameNullableFilter<$PrismaModel>
  }

  export type EnumSoundWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Sound | EnumSoundFieldRefInput<$PrismaModel>
    in?: $Enums.Sound[] | ListEnumSoundFieldRefInput<$PrismaModel>
    notIn?: $Enums.Sound[] | ListEnumSoundFieldRefInput<$PrismaModel>
    not?: NestedEnumSoundWithAggregatesFilter<$PrismaModel> | $Enums.Sound
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSoundFilter<$PrismaModel>
    _max?: NestedEnumSoundFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type SecretCombinationAssetOneAssetTwoAssetThreeAssetFourSoundCompoundUniqueInput = {
    assetOne: $Enums.AssetName
    assetTwo: $Enums.AssetName
    assetThree: $Enums.AssetName
    assetFour: $Enums.AssetName
    sound: $Enums.Sound
  }

  export type SecretCombinationCountOrderByAggregateInput = {
    id?: SortOrder
    assetOne?: SortOrder
    assetTwo?: SortOrder
    assetThree?: SortOrder
    assetFour?: SortOrder
    sound?: SortOrder
    foundById?: SortOrder
    foundByEmail?: SortOrder
    foundAt?: SortOrder
  }

  export type SecretCombinationMaxOrderByAggregateInput = {
    id?: SortOrder
    assetOne?: SortOrder
    assetTwo?: SortOrder
    assetThree?: SortOrder
    assetFour?: SortOrder
    sound?: SortOrder
    foundById?: SortOrder
    foundByEmail?: SortOrder
    foundAt?: SortOrder
  }

  export type SecretCombinationMinOrderByAggregateInput = {
    id?: SortOrder
    assetOne?: SortOrder
    assetTwo?: SortOrder
    assetThree?: SortOrder
    assetFour?: SortOrder
    sound?: SortOrder
    foundById?: SortOrder
    foundByEmail?: SortOrder
    foundAt?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type CombinationCreateNestedManyWithoutFoundByInput = {
    create?: XOR<CombinationCreateWithoutFoundByInput, CombinationUncheckedCreateWithoutFoundByInput> | CombinationCreateWithoutFoundByInput[] | CombinationUncheckedCreateWithoutFoundByInput[]
    connectOrCreate?: CombinationCreateOrConnectWithoutFoundByInput | CombinationCreateOrConnectWithoutFoundByInput[]
    createMany?: CombinationCreateManyFoundByInputEnvelope
    connect?: CombinationWhereUniqueInput | CombinationWhereUniqueInput[]
  }

  export type SecretCombinationCreateNestedManyWithoutFoundByInput = {
    create?: XOR<SecretCombinationCreateWithoutFoundByInput, SecretCombinationUncheckedCreateWithoutFoundByInput> | SecretCombinationCreateWithoutFoundByInput[] | SecretCombinationUncheckedCreateWithoutFoundByInput[]
    connectOrCreate?: SecretCombinationCreateOrConnectWithoutFoundByInput | SecretCombinationCreateOrConnectWithoutFoundByInput[]
    createMany?: SecretCombinationCreateManyFoundByInputEnvelope
    connect?: SecretCombinationWhereUniqueInput | SecretCombinationWhereUniqueInput[]
  }

  export type CombinationUncheckedCreateNestedManyWithoutFoundByInput = {
    create?: XOR<CombinationCreateWithoutFoundByInput, CombinationUncheckedCreateWithoutFoundByInput> | CombinationCreateWithoutFoundByInput[] | CombinationUncheckedCreateWithoutFoundByInput[]
    connectOrCreate?: CombinationCreateOrConnectWithoutFoundByInput | CombinationCreateOrConnectWithoutFoundByInput[]
    createMany?: CombinationCreateManyFoundByInputEnvelope
    connect?: CombinationWhereUniqueInput | CombinationWhereUniqueInput[]
  }

  export type SecretCombinationUncheckedCreateNestedManyWithoutFoundByInput = {
    create?: XOR<SecretCombinationCreateWithoutFoundByInput, SecretCombinationUncheckedCreateWithoutFoundByInput> | SecretCombinationCreateWithoutFoundByInput[] | SecretCombinationUncheckedCreateWithoutFoundByInput[]
    connectOrCreate?: SecretCombinationCreateOrConnectWithoutFoundByInput | SecretCombinationCreateOrConnectWithoutFoundByInput[]
    createMany?: SecretCombinationCreateManyFoundByInputEnvelope
    connect?: SecretCombinationWhereUniqueInput | SecretCombinationWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type CombinationUpdateManyWithoutFoundByNestedInput = {
    create?: XOR<CombinationCreateWithoutFoundByInput, CombinationUncheckedCreateWithoutFoundByInput> | CombinationCreateWithoutFoundByInput[] | CombinationUncheckedCreateWithoutFoundByInput[]
    connectOrCreate?: CombinationCreateOrConnectWithoutFoundByInput | CombinationCreateOrConnectWithoutFoundByInput[]
    upsert?: CombinationUpsertWithWhereUniqueWithoutFoundByInput | CombinationUpsertWithWhereUniqueWithoutFoundByInput[]
    createMany?: CombinationCreateManyFoundByInputEnvelope
    set?: CombinationWhereUniqueInput | CombinationWhereUniqueInput[]
    disconnect?: CombinationWhereUniqueInput | CombinationWhereUniqueInput[]
    delete?: CombinationWhereUniqueInput | CombinationWhereUniqueInput[]
    connect?: CombinationWhereUniqueInput | CombinationWhereUniqueInput[]
    update?: CombinationUpdateWithWhereUniqueWithoutFoundByInput | CombinationUpdateWithWhereUniqueWithoutFoundByInput[]
    updateMany?: CombinationUpdateManyWithWhereWithoutFoundByInput | CombinationUpdateManyWithWhereWithoutFoundByInput[]
    deleteMany?: CombinationScalarWhereInput | CombinationScalarWhereInput[]
  }

  export type SecretCombinationUpdateManyWithoutFoundByNestedInput = {
    create?: XOR<SecretCombinationCreateWithoutFoundByInput, SecretCombinationUncheckedCreateWithoutFoundByInput> | SecretCombinationCreateWithoutFoundByInput[] | SecretCombinationUncheckedCreateWithoutFoundByInput[]
    connectOrCreate?: SecretCombinationCreateOrConnectWithoutFoundByInput | SecretCombinationCreateOrConnectWithoutFoundByInput[]
    upsert?: SecretCombinationUpsertWithWhereUniqueWithoutFoundByInput | SecretCombinationUpsertWithWhereUniqueWithoutFoundByInput[]
    createMany?: SecretCombinationCreateManyFoundByInputEnvelope
    set?: SecretCombinationWhereUniqueInput | SecretCombinationWhereUniqueInput[]
    disconnect?: SecretCombinationWhereUniqueInput | SecretCombinationWhereUniqueInput[]
    delete?: SecretCombinationWhereUniqueInput | SecretCombinationWhereUniqueInput[]
    connect?: SecretCombinationWhereUniqueInput | SecretCombinationWhereUniqueInput[]
    update?: SecretCombinationUpdateWithWhereUniqueWithoutFoundByInput | SecretCombinationUpdateWithWhereUniqueWithoutFoundByInput[]
    updateMany?: SecretCombinationUpdateManyWithWhereWithoutFoundByInput | SecretCombinationUpdateManyWithWhereWithoutFoundByInput[]
    deleteMany?: SecretCombinationScalarWhereInput | SecretCombinationScalarWhereInput[]
  }

  export type CombinationUncheckedUpdateManyWithoutFoundByNestedInput = {
    create?: XOR<CombinationCreateWithoutFoundByInput, CombinationUncheckedCreateWithoutFoundByInput> | CombinationCreateWithoutFoundByInput[] | CombinationUncheckedCreateWithoutFoundByInput[]
    connectOrCreate?: CombinationCreateOrConnectWithoutFoundByInput | CombinationCreateOrConnectWithoutFoundByInput[]
    upsert?: CombinationUpsertWithWhereUniqueWithoutFoundByInput | CombinationUpsertWithWhereUniqueWithoutFoundByInput[]
    createMany?: CombinationCreateManyFoundByInputEnvelope
    set?: CombinationWhereUniqueInput | CombinationWhereUniqueInput[]
    disconnect?: CombinationWhereUniqueInput | CombinationWhereUniqueInput[]
    delete?: CombinationWhereUniqueInput | CombinationWhereUniqueInput[]
    connect?: CombinationWhereUniqueInput | CombinationWhereUniqueInput[]
    update?: CombinationUpdateWithWhereUniqueWithoutFoundByInput | CombinationUpdateWithWhereUniqueWithoutFoundByInput[]
    updateMany?: CombinationUpdateManyWithWhereWithoutFoundByInput | CombinationUpdateManyWithWhereWithoutFoundByInput[]
    deleteMany?: CombinationScalarWhereInput | CombinationScalarWhereInput[]
  }

  export type SecretCombinationUncheckedUpdateManyWithoutFoundByNestedInput = {
    create?: XOR<SecretCombinationCreateWithoutFoundByInput, SecretCombinationUncheckedCreateWithoutFoundByInput> | SecretCombinationCreateWithoutFoundByInput[] | SecretCombinationUncheckedCreateWithoutFoundByInput[]
    connectOrCreate?: SecretCombinationCreateOrConnectWithoutFoundByInput | SecretCombinationCreateOrConnectWithoutFoundByInput[]
    upsert?: SecretCombinationUpsertWithWhereUniqueWithoutFoundByInput | SecretCombinationUpsertWithWhereUniqueWithoutFoundByInput[]
    createMany?: SecretCombinationCreateManyFoundByInputEnvelope
    set?: SecretCombinationWhereUniqueInput | SecretCombinationWhereUniqueInput[]
    disconnect?: SecretCombinationWhereUniqueInput | SecretCombinationWhereUniqueInput[]
    delete?: SecretCombinationWhereUniqueInput | SecretCombinationWhereUniqueInput[]
    connect?: SecretCombinationWhereUniqueInput | SecretCombinationWhereUniqueInput[]
    update?: SecretCombinationUpdateWithWhereUniqueWithoutFoundByInput | SecretCombinationUpdateWithWhereUniqueWithoutFoundByInput[]
    updateMany?: SecretCombinationUpdateManyWithWhereWithoutFoundByInput | SecretCombinationUpdateManyWithWhereWithoutFoundByInput[]
    deleteMany?: SecretCombinationScalarWhereInput | SecretCombinationScalarWhereInput[]
  }

  export type AssetCreatetagsInput = {
    set: string[]
  }

  export type EnumAssetNameFieldUpdateOperationsInput = {
    set?: $Enums.AssetName
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumAssetTypeFieldUpdateOperationsInput = {
    set?: $Enums.AssetType
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type AssetUpdatetagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type UserCreateNestedOneWithoutCombinationsInput = {
    create?: XOR<UserCreateWithoutCombinationsInput, UserUncheckedCreateWithoutCombinationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCombinationsInput
    connect?: UserWhereUniqueInput
  }

  export type NullableEnumAssetNameFieldUpdateOperationsInput = {
    set?: $Enums.AssetName | null
  }

  export type EnumSoundFieldUpdateOperationsInput = {
    set?: $Enums.Sound
  }

  export type UserUpdateOneRequiredWithoutCombinationsNestedInput = {
    create?: XOR<UserCreateWithoutCombinationsInput, UserUncheckedCreateWithoutCombinationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCombinationsInput
    upsert?: UserUpsertWithoutCombinationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCombinationsInput, UserUpdateWithoutCombinationsInput>, UserUncheckedUpdateWithoutCombinationsInput>
  }

  export type UserCreateNestedOneWithoutSecretCombinationsInput = {
    create?: XOR<UserCreateWithoutSecretCombinationsInput, UserUncheckedCreateWithoutSecretCombinationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSecretCombinationsInput
    connect?: UserWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneWithoutSecretCombinationsNestedInput = {
    create?: XOR<UserCreateWithoutSecretCombinationsInput, UserUncheckedCreateWithoutSecretCombinationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSecretCombinationsInput
    upsert?: UserUpsertWithoutSecretCombinationsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSecretCombinationsInput, UserUpdateWithoutSecretCombinationsInput>, UserUncheckedUpdateWithoutSecretCombinationsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
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
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumAssetNameFilter<$PrismaModel = never> = {
    equals?: $Enums.AssetName | EnumAssetNameFieldRefInput<$PrismaModel>
    in?: $Enums.AssetName[] | ListEnumAssetNameFieldRefInput<$PrismaModel>
    notIn?: $Enums.AssetName[] | ListEnumAssetNameFieldRefInput<$PrismaModel>
    not?: NestedEnumAssetNameFilter<$PrismaModel> | $Enums.AssetName
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumAssetTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AssetType | EnumAssetTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AssetType[] | ListEnumAssetTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AssetType[] | ListEnumAssetTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAssetTypeFilter<$PrismaModel> | $Enums.AssetType
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedEnumAssetNameWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AssetName | EnumAssetNameFieldRefInput<$PrismaModel>
    in?: $Enums.AssetName[] | ListEnumAssetNameFieldRefInput<$PrismaModel>
    notIn?: $Enums.AssetName[] | ListEnumAssetNameFieldRefInput<$PrismaModel>
    not?: NestedEnumAssetNameWithAggregatesFilter<$PrismaModel> | $Enums.AssetName
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAssetNameFilter<$PrismaModel>
    _max?: NestedEnumAssetNameFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
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

  export type NestedEnumAssetTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AssetType | EnumAssetTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AssetType[] | ListEnumAssetTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AssetType[] | ListEnumAssetTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAssetTypeWithAggregatesFilter<$PrismaModel> | $Enums.AssetType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAssetTypeFilter<$PrismaModel>
    _max?: NestedEnumAssetTypeFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
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
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumAssetNameNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.AssetName | EnumAssetNameFieldRefInput<$PrismaModel> | null
    in?: $Enums.AssetName[] | ListEnumAssetNameFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.AssetName[] | ListEnumAssetNameFieldRefInput<$PrismaModel> | null
    not?: NestedEnumAssetNameNullableFilter<$PrismaModel> | $Enums.AssetName | null
  }

  export type NestedEnumSoundFilter<$PrismaModel = never> = {
    equals?: $Enums.Sound | EnumSoundFieldRefInput<$PrismaModel>
    in?: $Enums.Sound[] | ListEnumSoundFieldRefInput<$PrismaModel>
    notIn?: $Enums.Sound[] | ListEnumSoundFieldRefInput<$PrismaModel>
    not?: NestedEnumSoundFilter<$PrismaModel> | $Enums.Sound
  }

  export type NestedEnumAssetNameNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AssetName | EnumAssetNameFieldRefInput<$PrismaModel> | null
    in?: $Enums.AssetName[] | ListEnumAssetNameFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.AssetName[] | ListEnumAssetNameFieldRefInput<$PrismaModel> | null
    not?: NestedEnumAssetNameNullableWithAggregatesFilter<$PrismaModel> | $Enums.AssetName | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumAssetNameNullableFilter<$PrismaModel>
    _max?: NestedEnumAssetNameNullableFilter<$PrismaModel>
  }

  export type NestedEnumSoundWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Sound | EnumSoundFieldRefInput<$PrismaModel>
    in?: $Enums.Sound[] | ListEnumSoundFieldRefInput<$PrismaModel>
    notIn?: $Enums.Sound[] | ListEnumSoundFieldRefInput<$PrismaModel>
    not?: NestedEnumSoundWithAggregatesFilter<$PrismaModel> | $Enums.Sound
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSoundFilter<$PrismaModel>
    _max?: NestedEnumSoundFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type CombinationCreateWithoutFoundByInput = {
    id?: string
    assetOne: $Enums.AssetName
    assetTwo?: $Enums.AssetName | null
    assetThree?: $Enums.AssetName | null
    assetFour?: $Enums.AssetName | null
    foundAt?: Date | string
    sound?: $Enums.Sound
  }

  export type CombinationUncheckedCreateWithoutFoundByInput = {
    id?: string
    assetOne: $Enums.AssetName
    assetTwo?: $Enums.AssetName | null
    assetThree?: $Enums.AssetName | null
    assetFour?: $Enums.AssetName | null
    foundAt?: Date | string
    sound?: $Enums.Sound
  }

  export type CombinationCreateOrConnectWithoutFoundByInput = {
    where: CombinationWhereUniqueInput
    create: XOR<CombinationCreateWithoutFoundByInput, CombinationUncheckedCreateWithoutFoundByInput>
  }

  export type CombinationCreateManyFoundByInputEnvelope = {
    data: CombinationCreateManyFoundByInput | CombinationCreateManyFoundByInput[]
    skipDuplicates?: boolean
  }

  export type SecretCombinationCreateWithoutFoundByInput = {
    id?: string
    assetOne: $Enums.AssetName
    assetTwo?: $Enums.AssetName | null
    assetThree?: $Enums.AssetName | null
    assetFour?: $Enums.AssetName | null
    sound?: $Enums.Sound
    foundByEmail?: string | null
    foundAt?: Date | string | null
  }

  export type SecretCombinationUncheckedCreateWithoutFoundByInput = {
    id?: string
    assetOne: $Enums.AssetName
    assetTwo?: $Enums.AssetName | null
    assetThree?: $Enums.AssetName | null
    assetFour?: $Enums.AssetName | null
    sound?: $Enums.Sound
    foundByEmail?: string | null
    foundAt?: Date | string | null
  }

  export type SecretCombinationCreateOrConnectWithoutFoundByInput = {
    where: SecretCombinationWhereUniqueInput
    create: XOR<SecretCombinationCreateWithoutFoundByInput, SecretCombinationUncheckedCreateWithoutFoundByInput>
  }

  export type SecretCombinationCreateManyFoundByInputEnvelope = {
    data: SecretCombinationCreateManyFoundByInput | SecretCombinationCreateManyFoundByInput[]
    skipDuplicates?: boolean
  }

  export type CombinationUpsertWithWhereUniqueWithoutFoundByInput = {
    where: CombinationWhereUniqueInput
    update: XOR<CombinationUpdateWithoutFoundByInput, CombinationUncheckedUpdateWithoutFoundByInput>
    create: XOR<CombinationCreateWithoutFoundByInput, CombinationUncheckedCreateWithoutFoundByInput>
  }

  export type CombinationUpdateWithWhereUniqueWithoutFoundByInput = {
    where: CombinationWhereUniqueInput
    data: XOR<CombinationUpdateWithoutFoundByInput, CombinationUncheckedUpdateWithoutFoundByInput>
  }

  export type CombinationUpdateManyWithWhereWithoutFoundByInput = {
    where: CombinationScalarWhereInput
    data: XOR<CombinationUpdateManyMutationInput, CombinationUncheckedUpdateManyWithoutFoundByInput>
  }

  export type CombinationScalarWhereInput = {
    AND?: CombinationScalarWhereInput | CombinationScalarWhereInput[]
    OR?: CombinationScalarWhereInput[]
    NOT?: CombinationScalarWhereInput | CombinationScalarWhereInput[]
    id?: StringFilter<"Combination"> | string
    assetOne?: EnumAssetNameFilter<"Combination"> | $Enums.AssetName
    assetTwo?: EnumAssetNameNullableFilter<"Combination"> | $Enums.AssetName | null
    assetThree?: EnumAssetNameNullableFilter<"Combination"> | $Enums.AssetName | null
    assetFour?: EnumAssetNameNullableFilter<"Combination"> | $Enums.AssetName | null
    foundAt?: DateTimeFilter<"Combination"> | Date | string
    foundById?: StringFilter<"Combination"> | string
    sound?: EnumSoundFilter<"Combination"> | $Enums.Sound
  }

  export type SecretCombinationUpsertWithWhereUniqueWithoutFoundByInput = {
    where: SecretCombinationWhereUniqueInput
    update: XOR<SecretCombinationUpdateWithoutFoundByInput, SecretCombinationUncheckedUpdateWithoutFoundByInput>
    create: XOR<SecretCombinationCreateWithoutFoundByInput, SecretCombinationUncheckedCreateWithoutFoundByInput>
  }

  export type SecretCombinationUpdateWithWhereUniqueWithoutFoundByInput = {
    where: SecretCombinationWhereUniqueInput
    data: XOR<SecretCombinationUpdateWithoutFoundByInput, SecretCombinationUncheckedUpdateWithoutFoundByInput>
  }

  export type SecretCombinationUpdateManyWithWhereWithoutFoundByInput = {
    where: SecretCombinationScalarWhereInput
    data: XOR<SecretCombinationUpdateManyMutationInput, SecretCombinationUncheckedUpdateManyWithoutFoundByInput>
  }

  export type SecretCombinationScalarWhereInput = {
    AND?: SecretCombinationScalarWhereInput | SecretCombinationScalarWhereInput[]
    OR?: SecretCombinationScalarWhereInput[]
    NOT?: SecretCombinationScalarWhereInput | SecretCombinationScalarWhereInput[]
    id?: StringFilter<"SecretCombination"> | string
    assetOne?: EnumAssetNameFilter<"SecretCombination"> | $Enums.AssetName
    assetTwo?: EnumAssetNameNullableFilter<"SecretCombination"> | $Enums.AssetName | null
    assetThree?: EnumAssetNameNullableFilter<"SecretCombination"> | $Enums.AssetName | null
    assetFour?: EnumAssetNameNullableFilter<"SecretCombination"> | $Enums.AssetName | null
    sound?: EnumSoundFilter<"SecretCombination"> | $Enums.Sound
    foundById?: StringNullableFilter<"SecretCombination"> | string | null
    foundByEmail?: StringNullableFilter<"SecretCombination"> | string | null
    foundAt?: DateTimeNullableFilter<"SecretCombination"> | Date | string | null
  }

  export type UserCreateWithoutCombinationsInput = {
    id?: string
    nickname: string
    secretCombinations?: SecretCombinationCreateNestedManyWithoutFoundByInput
  }

  export type UserUncheckedCreateWithoutCombinationsInput = {
    id?: string
    nickname: string
    secretCombinations?: SecretCombinationUncheckedCreateNestedManyWithoutFoundByInput
  }

  export type UserCreateOrConnectWithoutCombinationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCombinationsInput, UserUncheckedCreateWithoutCombinationsInput>
  }

  export type UserUpsertWithoutCombinationsInput = {
    update: XOR<UserUpdateWithoutCombinationsInput, UserUncheckedUpdateWithoutCombinationsInput>
    create: XOR<UserCreateWithoutCombinationsInput, UserUncheckedCreateWithoutCombinationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCombinationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCombinationsInput, UserUncheckedUpdateWithoutCombinationsInput>
  }

  export type UserUpdateWithoutCombinationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    secretCombinations?: SecretCombinationUpdateManyWithoutFoundByNestedInput
  }

  export type UserUncheckedUpdateWithoutCombinationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    secretCombinations?: SecretCombinationUncheckedUpdateManyWithoutFoundByNestedInput
  }

  export type UserCreateWithoutSecretCombinationsInput = {
    id?: string
    nickname: string
    combinations?: CombinationCreateNestedManyWithoutFoundByInput
  }

  export type UserUncheckedCreateWithoutSecretCombinationsInput = {
    id?: string
    nickname: string
    combinations?: CombinationUncheckedCreateNestedManyWithoutFoundByInput
  }

  export type UserCreateOrConnectWithoutSecretCombinationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSecretCombinationsInput, UserUncheckedCreateWithoutSecretCombinationsInput>
  }

  export type UserUpsertWithoutSecretCombinationsInput = {
    update: XOR<UserUpdateWithoutSecretCombinationsInput, UserUncheckedUpdateWithoutSecretCombinationsInput>
    create: XOR<UserCreateWithoutSecretCombinationsInput, UserUncheckedCreateWithoutSecretCombinationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSecretCombinationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSecretCombinationsInput, UserUncheckedUpdateWithoutSecretCombinationsInput>
  }

  export type UserUpdateWithoutSecretCombinationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    combinations?: CombinationUpdateManyWithoutFoundByNestedInput
  }

  export type UserUncheckedUpdateWithoutSecretCombinationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    combinations?: CombinationUncheckedUpdateManyWithoutFoundByNestedInput
  }

  export type CombinationCreateManyFoundByInput = {
    id?: string
    assetOne: $Enums.AssetName
    assetTwo?: $Enums.AssetName | null
    assetThree?: $Enums.AssetName | null
    assetFour?: $Enums.AssetName | null
    foundAt?: Date | string
    sound?: $Enums.Sound
  }

  export type SecretCombinationCreateManyFoundByInput = {
    id?: string
    assetOne: $Enums.AssetName
    assetTwo?: $Enums.AssetName | null
    assetThree?: $Enums.AssetName | null
    assetFour?: $Enums.AssetName | null
    sound?: $Enums.Sound
    foundByEmail?: string | null
    foundAt?: Date | string | null
  }

  export type CombinationUpdateWithoutFoundByInput = {
    id?: StringFieldUpdateOperationsInput | string
    assetOne?: EnumAssetNameFieldUpdateOperationsInput | $Enums.AssetName
    assetTwo?: NullableEnumAssetNameFieldUpdateOperationsInput | $Enums.AssetName | null
    assetThree?: NullableEnumAssetNameFieldUpdateOperationsInput | $Enums.AssetName | null
    assetFour?: NullableEnumAssetNameFieldUpdateOperationsInput | $Enums.AssetName | null
    foundAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sound?: EnumSoundFieldUpdateOperationsInput | $Enums.Sound
  }

  export type CombinationUncheckedUpdateWithoutFoundByInput = {
    id?: StringFieldUpdateOperationsInput | string
    assetOne?: EnumAssetNameFieldUpdateOperationsInput | $Enums.AssetName
    assetTwo?: NullableEnumAssetNameFieldUpdateOperationsInput | $Enums.AssetName | null
    assetThree?: NullableEnumAssetNameFieldUpdateOperationsInput | $Enums.AssetName | null
    assetFour?: NullableEnumAssetNameFieldUpdateOperationsInput | $Enums.AssetName | null
    foundAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sound?: EnumSoundFieldUpdateOperationsInput | $Enums.Sound
  }

  export type CombinationUncheckedUpdateManyWithoutFoundByInput = {
    id?: StringFieldUpdateOperationsInput | string
    assetOne?: EnumAssetNameFieldUpdateOperationsInput | $Enums.AssetName
    assetTwo?: NullableEnumAssetNameFieldUpdateOperationsInput | $Enums.AssetName | null
    assetThree?: NullableEnumAssetNameFieldUpdateOperationsInput | $Enums.AssetName | null
    assetFour?: NullableEnumAssetNameFieldUpdateOperationsInput | $Enums.AssetName | null
    foundAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sound?: EnumSoundFieldUpdateOperationsInput | $Enums.Sound
  }

  export type SecretCombinationUpdateWithoutFoundByInput = {
    id?: StringFieldUpdateOperationsInput | string
    assetOne?: EnumAssetNameFieldUpdateOperationsInput | $Enums.AssetName
    assetTwo?: NullableEnumAssetNameFieldUpdateOperationsInput | $Enums.AssetName | null
    assetThree?: NullableEnumAssetNameFieldUpdateOperationsInput | $Enums.AssetName | null
    assetFour?: NullableEnumAssetNameFieldUpdateOperationsInput | $Enums.AssetName | null
    sound?: EnumSoundFieldUpdateOperationsInput | $Enums.Sound
    foundByEmail?: NullableStringFieldUpdateOperationsInput | string | null
    foundAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SecretCombinationUncheckedUpdateWithoutFoundByInput = {
    id?: StringFieldUpdateOperationsInput | string
    assetOne?: EnumAssetNameFieldUpdateOperationsInput | $Enums.AssetName
    assetTwo?: NullableEnumAssetNameFieldUpdateOperationsInput | $Enums.AssetName | null
    assetThree?: NullableEnumAssetNameFieldUpdateOperationsInput | $Enums.AssetName | null
    assetFour?: NullableEnumAssetNameFieldUpdateOperationsInput | $Enums.AssetName | null
    sound?: EnumSoundFieldUpdateOperationsInput | $Enums.Sound
    foundByEmail?: NullableStringFieldUpdateOperationsInput | string | null
    foundAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SecretCombinationUncheckedUpdateManyWithoutFoundByInput = {
    id?: StringFieldUpdateOperationsInput | string
    assetOne?: EnumAssetNameFieldUpdateOperationsInput | $Enums.AssetName
    assetTwo?: NullableEnumAssetNameFieldUpdateOperationsInput | $Enums.AssetName | null
    assetThree?: NullableEnumAssetNameFieldUpdateOperationsInput | $Enums.AssetName | null
    assetFour?: NullableEnumAssetNameFieldUpdateOperationsInput | $Enums.AssetName | null
    sound?: EnumSoundFieldUpdateOperationsInput | $Enums.Sound
    foundByEmail?: NullableStringFieldUpdateOperationsInput | string | null
    foundAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
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