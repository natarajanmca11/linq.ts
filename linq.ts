/**
 * LinQ to TypeScript
 *
 * Documentation from LinQ .NET specification (https://msdn.microsoft.com/en-us/library/system.linq.enumerable.aspx)
 *
 * Created by Flavio Corpa (@kutyel)
 * Copyright © 2016 Flavio Corpa. All rights reserved.
 *
 */
export class List<T> {

    protected _elements: T[];

    /**
     * Defaults the elements of the list
     */
    constructor(elements?: T[]) {
        this._elements = elements || [];
    }

    /**
     * Adds an object to the end of the List<T>.
     */
    public Add(element: T): void {
        this._elements.push(element);
    }

    /**
     * Adds the elements of the specified collection to the end of the List<T>.
     */
    public AddRange(elements: T[]): void {
        this._elements.push(...elements);
    }

    /**
     * Applies an accumulator function over a sequence.
     */
    public Aggregate<U>(accumulator: (accum: U, value?: T, index?: number, list?: T[]) => any, initialValue?: U): any {
        return this._elements.reduce(accumulator, initialValue);
    }

    /**
     * Determines whether all elements of a sequence satisfy a condition.
     */
    public All(predicate: (value?: T, index?: number, list?: T[]) => boolean): boolean {
        return this._elements.every(predicate);
    }

    /**
     * Determines whether a sequence contains any elements.
     */
    public Any(predicate: (value?: T, index?: number, list?: T[]) => boolean): boolean {
        return this._elements.some(predicate);
    }

    /**
     * Computes the average of a sequence of number values that are obtained by invoking
     * a transform function on each element of the input sequence.
     */
    public Average(): number;
    public Average(transform: (value?: T, index?: number, list?: T[]) => any): number;
    public Average(transform?: (value?: T, index?: number, list?: T[]) => any): number {
        return this.Sum(transform) / this.Count(transform);
    }

    /**
     * Concatenates two sequences.
     */
    public Concat(list: List<T>): List<T>  {
        return new List<T>(this._elements.concat(list.ToArray()));
    }

    /**
     * Determines whether an element is in the List<T>.
     */
    public Contains(element: T): boolean {
        return this._elements.some(x => x === element);
    }

    /**
     * Returns the number of elements in a sequence.
     */
    public Count(): number;
    public Count(predicate: (value?: T, index?: number, list?: T[]) => boolean): number;
    public Count(predicate?: (value?: T, index?: number, list?: T[]) => boolean): number {
        return predicate ? this.Where(predicate).Count() : this._elements.length;
    }

    /**
     * Returns the elements of the specified sequence or the type parameter's default value
     * in a singleton collection if the sequence is empty.
     */
    public DefaultIfEmpty(defaultValue?: T): List<T> {
        return this.Count() ? this : new List<T>([defaultValue]);
    }

    /**
     * Returns distinct elements from a sequence by using the default equality comparer to compare values.
     */
    public Distinct(): List<T> {
        return this.Where((value, index, iter) => iter.indexOf(value) === index);
    }

    /**
     * Returns the element at a specified index in a sequence.
     */
    public ElementAt(index: number): T {
        return this._elements[index];
    }

    /**
     * Returns the element at a specified index in a sequence or a default value if the index is out of range.
     */
    public ElementAtOrDefault(index: number): T {
        return this.ElementAt(index) || undefined;
    }

    /**
     * Produces the set difference of two sequences by using the default equality comparer to compare values.
     */
    public Except(source: List<T>): List<T> {
        return this.Where(x => !source.Contains(x));
    }

    /**
     * Returns the first element of a sequence.
     */
    public First(): T;
    public First(predicate: (value?: T, index?: number, list?: T[]) => boolean): T;
    public First(predicate?: (value?: T, index?: number, list?: T[]) => boolean): T {
        return predicate ? this.Where(predicate).First() : this._elements[0];
    }

    /**
     * Returns the first element of a sequence, or a default value if the sequence contains no elements.
     */
    public FirstOrDefault(): T;
    public FirstOrDefault(predicate: (value?: T, index?: number, list?: T[]) => boolean): T;
    public FirstOrDefault(predicate?: (value?: T, index?: number, list?: T[]) => boolean): T {
        return this.Count() ? this.First() : undefined;
    }

    /**
     * Performs the specified action on each element of the List<T>.
     */
    public ForEach(action: (value?: T, index?: number, list?: T[]) => any): void {
        return this._elements.forEach(action);
    }

    /**
     * Groups the elements of a sequence according to a specified key selector function.
     */
    public GroupBy(grouper: (key: T) => any, mapper: (element: T) => any): any {
        return this.Aggregate((ac, v) => (ac[grouper(v)] ? ac[grouper(v)].push(mapper(v)) : ac[grouper(v)] = [mapper(v)], ac), {});
    }

    /**
     * Correlates the elements of two sequences based on equality of keys and groups the results.
     * The default equality comparer is used to compare keys.
     */
    public GroupJoin<U>(list: List<U>, key1: (k: T) => any, key2: (k: U) => any, result: (first: T, second: List<U>) => any): List<any> {
        return this.Select((x, y) => result(x, list.Where(z => key1(x) === key2(z))));
    }

    /**
     * Produces the set intersection of two sequences by using the default equality comparer to compare values.
     */
    public Intersect(source: List<T>): List<T> {
        return this.Where(x => source.Contains(x));
    }

    /**
     * Correlates the elements of two sequences based on matching keys. The default equality comparer is used to compare keys.
     */
    public Join<U>(list: List<U>, key1: (key: T) => any, key2: (key: U) => any, result: (first: T, second: U) => any): List<any> {
        return this.SelectMany(x => list.Where(y => key2(y) === key1(x)).Select(z => result(x, z)));
    }

    /**
     * Returns the last element of a sequence.
     */
    public Last(): T;
    public Last(predicate: (value?: T, index?: number, list?: T[]) => boolean): T;
    public Last(predicate?: (value?: T, index?: number, list?: T[]) => boolean): T {
        return predicate ? this.Where(predicate).Last() : this._elements[this.Count() - 1];
    }

    /**
     * Returns the last element of a sequence, or a default value if the sequence contains no elements.
     */
    public LastOrDefault(): T;
    public LastOrDefault(predicate: (value?: T, index?: number, list?: T[]) => boolean): T;
    public LastOrDefault(predicate?: (value?: T, index?: number, list?: T[]) => boolean): T {
        return this.Count() ? this.Last() : undefined;
    }

    /**
     * Returns the maximum value in a generic sequence.
     */
    public Max(): T {
        return this.Aggregate((x, y) => x > y ? x : y);
    }

    /**
     * Returns the minimum value in a generic sequence.
     */
    public Min(): T {
        return this.Aggregate((x, y) => x < y ? x : y);
    }

    /**
     * Sorts the elements of a sequence in ascending order according to a key.
     */
    public OrderBy(comparator: (key: T) => any): List<T> {
        return new OrderedList<T>(this, comparator, false);
    }

    /**
     * Sorts the elements of a sequence in descending order according to a key.
     */
    public OrderByDescending(comparator: (key: T) => any): List<T> {
        return new OrderedList<T>(this, comparator, true);
    }

    /**
     * Performs a subsequent ordering of the elements in a sequence in ascending order according to a key.
     */
    public ThenBy(comparator: (key: T) => any): List<T> {
        return this.OrderBy(comparator);
    }

    /**
     * Performs a subsequent ordering of the elements in a sequence in descending order, according to a key.
     */
    public ThenByDescending(comparator: (key: T) => any): List<T> {
        return this.OrderByDescending(comparator);
    }

    /**
     * Reverses the order of the elements in the entire List<T>.
     */
    public Reverse(): List<T> {
        return new List<T>(this._elements.reverse());
    }

    /**
     * Projects each element of a sequence into a new form.
     */
    public Select(mapper: (value?: T, index?: number, list?: T[]) => any): List<any> {
        return new List<any>(this._elements.map(mapper));
    }

    /**
     * Projects each element of a sequence to a List<any> and flattens the resulting sequences into one sequence.
     */
    public SelectMany(mapper: (value?: T, index?: number, list?: T[]) => any): List<any> {
        return this.Aggregate((ac, v, i) => (ac.AddRange(this.Select(mapper).ElementAt(i).ToArray()), ac), new List<any>());
    }

    /**
     * Determines whether two sequences are equal by comparing the elements by using the default equality comparer for their type.
     */
    public SequenceEqual(list: List<T>): boolean {
        return !!this._elements.reduce((x, y, z) => list._elements[z] === y ? x : undefined);
    }

    /**
     * Returns the only element of a sequence, and throws an exception if there is not exactly one element in the sequence.
     */
    public Single(): T | TypeError {
        if (this.Count() !== 1) {
            throw new TypeError("The collection does not contain exactly one element.");
        } else {
            return this.First();
        }
    }

    /**
     * Returns the only element of a sequence, or a default value if the sequence is empty;
     * this method throws an exception if there is more than one element in the sequence.
     */
    public SingleOrDefault(): T | TypeError {
        return this.Count() ? this.Single() : undefined;
    }

    /**
     * Bypasses a specified number of elements in a sequence and then returns the remaining elements.
     */
    public Skip(amount: number): List<T> {
        return new List<T>(this._elements.slice(Math.max(0, amount)));
    }

    /**
     * Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements.
     */
    public SkipWhile(predicate: (value?: T, index?: number, list?: T[]) => boolean): List<T> {
        return this.Skip(this.Aggregate((ac, val) => predicate(this.ElementAt(ac)) ? ++ac : ac, 0));
    }

    /**
     * Computes the sum of the sequence of number values that are obtained by invoking
     * a transform function on each element of the input sequence.
     */
    public Sum(): number;
    public Sum(transform: (value?: T, index?: number, list?: T[]) => number): number;
    public Sum(transform?: (value?: T, index?: number, list?: T[]) => number): number {
        return transform ? this.Select(transform).Sum() : this.Aggregate((ac, v) => ac += (+v), 0);
    }

    /**
     * Returns a specified number of contiguous elements from the start of a sequence.
     */
    public Take(amount: number): List<T> {
        return new List<T>(this._elements.slice(0, Math.max(0, amount)));
    }

    /**
     * Returns elements from a sequence as long as a specified condition is true.
     */
    public TakeWhile(predicate: (value?: T, index?: number, list?: T[]) => boolean): List<T> {
        return this.Take(this.Aggregate((ac, val) => predicate(this.ElementAt(ac)) ? ++ac : ac, 0));
    }

    /**
     * Copies the elements of the List<T> to a new array.
     */
    public ToArray(): T[] {
        return this._elements;
    }

    /**
     * Creates a Dictionary<TKey, TValue> from a List<T> according to a specified key selector function.
     */
    public ToDictionary<TKey, TValue>(key: (key: any) => TKey, value?: (value: any) => TValue): any {
        return this.Aggregate((o, v, i) => (o[this.Select(key).ElementAt(i)] = value ? this.Select(value).ElementAt(i) : v, o), {});
    }

    /**
     * Creates a List<T> from an Enumerable.List<T>.
     */
    public ToList(): List<T> {
        return this;
    }

    /**
     * Produces the set union of two sequences by using the default equality comparer.
     */
    public Union(list: List<T>): List<T> {
        return this.Concat(list).Distinct();
    }

    /**
     * Filters a sequence of values based on a predicate.
     */
    public Where(predicate: (value?: T, index?: number, list?: T[]) => boolean): List<T> {
        return new List<T>(this._elements.filter(predicate));
    }

    /**
     * Applies a specified function to the corresponding elements of two sequences, producing a sequence of the results.
     */
    public Zip<U>(list: List<U>, result: (first: T, second: U) => any): List<any> {
        return list.Count() < this.Count() ? list.Select((x, y) => result(this.ElementAt(y), x)) :
            this.Select((x, y) => result(x, list.ElementAt(y)));
    }
}

class OrderedList<T> extends List<T> {

    constructor(list: List<T>, private _orderBy: (key: T) => any, private _reverse?: boolean) {
        super(list.ToArray());

        this._elements.sort((x, y) => this._asc(_orderBy(x), _orderBy(y)));

        if (_reverse) {
            this._elements.reverse();
        }
    }

    /**
     * Performs a subsequent ordering of the elements in a sequence in ascending order according to a key.
     * @override
     */
    public ThenBy(comp: (key: T) => any): List<T> {
        return new List<T>(this._elements.sort((x, y) => this._asc(this._orderBy(x), this._orderBy(y)) || this._asc(comp(x), comp(y))));
    }

    /**
     * Performs a subsequent ordering of the elements in a sequence in descending order, according to a key.
     * @override
     */
    public ThenByDescending(comp: (key: T) => any): List<T> {
        return new List<T>(this._elements.sort((x, y) => this._asc(this._orderBy(x), this._orderBy(y)) || this._desc(comp(x), comp(y))));
    }

    /**
     * Default ascendent comparer function.
     */
    private _asc(a: any, b: any): number {
        return a > b ? 1 : a < b ? -1 : 0;
    }

    /**
     * Default descendent comparer function.
     */
    private _desc(a: any, b: any): number {
        return a < b ? 1 : a > b ? -1 : 0;
    }
}

export class Enumerable {

    /**
     * Generates a sequence of integral numbers within a specified range.
     */
    public static Range(start: number, count: number): List<number> {
        let result = new List<number>(); while (count--) { result.Add(start++); } return result;
    }

    /**
     * Generates a sequence that contains one repeated value.
     */
    public static Repeat<T>(element: T, count: number): List<T> {
        let result = new List<T>(); while (count--) { result.Add(element); } return result;
    }
}
