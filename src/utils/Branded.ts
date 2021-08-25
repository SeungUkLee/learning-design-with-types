// declare const _brand: unique symbol;

// type Tagged<Tag extends string> = { [_brand]: Tag }
type Tagged<Tag extends string> = { _tag: Tag }

export type Branded<Type, Tag extends string> = Type & Tagged<Tag>
export type Unwrap<T> = T extends Branded<infer Type, string> ? Type : never;

